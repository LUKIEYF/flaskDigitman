config_dict = dict(

    Acess_config = dict(
        authorization = "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",
    ),

    Model_config = dict(
        model_name = "gpt-3.5-turbo",
        request_address = "https://api.openai.com/v1/chat/completions",
    ),

    Context_manage_config = dict(
        max_context = 5000,
        del_config = dict(
        distance_weights=0.05,
        length_weights=0.4,
        role_weights=1,
        sys_role_ratio=3,
        del_ratio = 0.4,
        max_keep_turns=30)
    ),

    generate_config = dict(
        use_cotomize_param = True,
        param_dict = dict(
        temperature = 1,
        stream = False
        )
    ),
)
