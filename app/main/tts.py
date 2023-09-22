
import pyttsx3
import librosa
import numpy as np

fixPath = "./app/main/temp/"

def text_to_audio(text):
    engine = pyttsx3.init()
    engine.save_to_file(text, fixPath+'temp.wav')  # 将文本保存为临时的 WAV 文件
    engine.runAndWait()
    
    # 使用 librosa 加载音频数据
    audio_data, _ = librosa.load(fixPath+'temp.wav', sr=44100)
    return audio_data

# def get_normalized_frequencies(audio_data):
#     # 计算音频数据的频率
#     magnitude = np.abs(librosa.stft(audio_data))
#     frequencies = librosa.core.fft_frequencies(sr=44100)
    
#     # 标准化频率数据
#     standardized_data = (magnitude.mean(axis=1) - np.min(magnitude.mean(axis=1))) / (np.max(magnitude.mean(axis=1)) - np.min(magnitude.mean(axis=1)))
    
#     # 使用 min-max scaling 扩展分布范围
#     min_value = np.min(standardized_data)
#     max_value = np.max(standardized_data)
#     scaled_data = (standardized_data - min_value) / (max_value - min_value)
    
#     return scaled_data

def get_normalized_frequencies(audio_data):
    # 计算音频数据的短时傅里叶变换
    stft = librosa.stft(audio_data)
    
    # 获取频谱的幅度谱（magnitude）
    magnitude = np.abs(stft)
    
    # 获取频率数组
    frequencies = librosa.core.fft_frequencies(sr=44100)
    
    # 标准化频率数据
    standardized_data = (frequencies - np.min(frequencies)) / (np.max(frequencies) - np.min(frequencies))
    
    # 使用 min-max scaling 扩展分布范围
    min_value = np.min(standardized_data)
    max_value = np.max(standardized_data)
    scaled_data = (standardized_data - min_value) / (max_value - min_value)
    
    return scaled_data

# 调用示例
def textFrequence(text)->list:
    audio_data = text_to_audio(text)
    normalized_frequencies = get_normalized_frequencies(audio_data)
    res = list(normalized_frequencies[::10].astype(float))
    # res = list(normalized_frequencies.astype(float))
    res.append(0)
    return res


