from .config.chatgpt_config import config_dict
from .src.openai_request import OpenAI_Request
import time
from .tools.cfg_wrapper import load_config
from .tools.context import ContextHandler
from .tools.tokennizer import Tokennizer
import pandas as pd
import time

class chatbotLukie():

    # load config
    config = load_config(config_dict)
    keys = config.Acess_config.authorization
    model_name = config.Model_config.model_name
    request_address = config.Model_config.request_address

    # load self.tokenizer
    tokenizer = Tokennizer(model_name)
    
    def __init__(self,log_time=False,context_max=3200):
        
        # load context
        context_manage_config = self.config.Context_manage_config
        del_config = context_manage_config.del_config
        max_context = context_manage_config.max_context
        self.context_handler = ContextHandler(max_context=max_context,context_del_config=del_config)
        
        self.requestor = OpenAI_Request(self.keys,self.model_name,self.request_address)
        self.log_time = log_time
        self.context_max = context_max
        self.response = None
        
    def query(self,input_s):

        if input_s == "clear":
            self.context_handler.clear()
            print('start a new session')
            return None
        
        else:
            inputs_length = self.tokenizer.num_tokens_from_string(input_s)
            self.context_handler.append_cur_to_context(input_s,inputs_length)

            st_time = time.time()
            
            res = self.requestor.post_request(self.context_handler.context)
            ed_time = time.time()

            if res.status_code == 200:

                response = res.json()['choices'][0]['message']['content']
                # cut \n for show
                response = response.lstrip("\n")

                completion_length = res.json()['usage']['completion_tokens']
                total_length = res.json()['usage']['total_tokens']
                
                self.response = {
                    "response":response
                }

                self.context_handler.append_cur_to_context(response,completion_length,tag=1)
                if total_length > self.context_max:
                    self.context_handler.cut_context(total_length,self.tokenizer)

            else:
                status_code = res.status_code
                reason = res.reason
                des = res.text
                raise print(f'visit error :\n status code: {status_code}\n reason: {reason}\n err description: {des}\n '
                            f'please check whether your account can access OpenAI API normally')

            if self.log_time:
                print(f'time cost : {ed_time - st_time}')
                
            return self.response