import os
import os.path as op

import subprocess
from turtle import mode
from urllib import request
from matplotlib.font_manager import json_dump
import numpy as np
import mne
import matplotlib.pyplot as plt
#, mpld3
import pandas 
from flask import Flask, jsonify, send_file,stream_with_context
from flask_cors import CORS
from dotenv import load_dotenv
from scipy import stats
from flask import request
from model_files import preprocess
from model_files import singlefile_pred
from google.cloud import storage
from multiprocessing import Process, Queue
import requests

# from config import storage_

load_dotenv()

RAW_BRAINVISION_PATH = os.getenv('RAW_BRAINVISION_PATH')
HOST =os.getenv('HOST')
app = Flask(__name__)
app.app_context().push()

UPLOAD_FOLDER = 'C:/Users/Fatima/Documents/GitHub/eeg-app/backend/fileuploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

# target = 'C:/Users/Fatima/Documents/GitHub/eeg-app/backend/fileuploads/00003306_s001_t001 (1).edf'

@app.route('/view', methods=['GET'])
def getEEG():
    
    # raw = mne.io.read_raw_brainvision(RAW_BRAINVISION_PATH,misc='auto')
    # raw.load_data() 
     
    # epochs=mne.make_fixed_length_epochs(raw,duration=5,overlap=1)
    # array= epochs.get_data()
    # print(array)
   
    # print(array.shape) #noofepochs, channels, length ofsignals (366,63,2500)                   
    # features=[]
    # features.append(np.mean(array,axis=-1))
    # features.append(np.std(array,axis=-1))
    # features.append(np.ptp(array, axis=-1))
    # features.append(np.var(array,axis=-1))
    # features.append(np.min(array,axis=-1))
    # features.append(np.max(array,axis=-1))
    # features.append(np.argmin(array, axis=-1))
    # features.append(np.argmax(array,axis=-1))
    # features.append(np.mean(array**2,axis=-1))
    # features.append(np.sqrt(np.mean(array**2,axis=-1)))
    # features.append(np.sum(np.abs(np.diff(array,axis=-1)),axis=-1))
    # features.append(stats.skew(array,axis=-1))
    # features.append(stats.kurtosis(array,axis=-1))
    # features=np.array(features)
    
    # print(features.shape)
    # raw.resample(256, npad="auto") 
    # raw.filter(1, 30, fir_design='firwin', picks=['eeg'])
    # raw.set_eeg_reference('average', projection=True).apply_proj()
    # events_from_annot,event_dict = mne.events_from_annotations(raw)wait 1 sec
                           
    # reject_criteria = dict(eeg=100e-6)                              
                                                                                                                 
    # epochs = mne.Epochs(raw, events_from_annot[0],tmin=-0.1, tmax=1.6,
    #                 reject=reject_criteria, baseline = (None,0), preload=True, picks=['eeg'])

    # ica = mne.preprocessing.ICA(n_components=50, random_state=97, method='fastica')

    # ica.fit(epochs)
    # ica.exclude =[0,3,4]
    # ica.apply(epochs)  

    #----------extracting data and time for channel at index 0----------------------
    # sampling_freq = raw.info['sfreq']
    # start_stop_seconds = np.array([11, 13])
    # start_sample, stop_sample = (start_stop_seconds * sampling_freq).astype(int)
    # channel_index = 0
    # raw_selection = raw[channel_index, start_sample:stop_sample]
    # print(raw_selection)

    # arr1 = raw_selection[1].tolist()
    # arr2 = raw_selection[0][0].tolist()
    #---------------------------------------------------------------------------------

    #--------------extracting data and time for all channels--------------------------
    # data,times = raw.get_data(return_times=True)
    
    # arr1 =data.tolist()
    # arr2 = times.tolist()
    # list1={'arr1':arr1,'arr2':arr2}
    # fig1 = plt.figure()
    # plt.plot(times,data.T)
    # plt.savefig('graph.png')
    # mpld3.save_html(fig1,'graph.html')
    #writing to a file
    # with open('eegdata.json','w') as file1:
    #    json.dump(list1,file1)

    
    #--------------------------------------------------------------------------------
    return jsonify({'arr2':'sent'})
    # return send_file('eegdata.json')
   
# @app.route('/load', methods=['GET'])
# def load_model():
#     subprocess.call(['python','/Users/Fatima/Documents/GitHub/eeg-app/backend/model_files/preprocess.py'])
#     conf = preprocess.seiz_len/ preprocess.total_length
#     conf=float("{:.2f}".format(conf))
#     return jsonify({'data':conf})

@app.route('/load', methods=['POST'])
def load_model():
    data = request.get_json()
    print(data)
    
    name = data['name']
    # name = '00003306_s001_t001.edf'
    # print("url"+url)
    print("name"+name)
    # target = 'C:/Users/Fatima/Documents/GitHub/eeg-app/backend/fileuploads/'
    # if not os.path.isdir(target):
    #     os.mkdir(target)
    target = 'C:/Users/Fatima/Documents/GitHub/eeg-app/backend/fileuploads/'+name
    
    # r = requests.get(url,stream=True)
    # with open(target,'wb') as f:
    #     f.write(r.content)

    # target=os.path.join(UPLOAD_FOLDER,'edf')
    # if not os.path.isdir(target):
    #     os.mkdir(target)
    
    # file = request.files['file']
    # file = request.form.get('file')
    # print('file', file)
    # filename = request.form.get('fileName')
    # print('filename',filename)
    # destination="/".join([target,filename])
    # file.save(target)

    # app.config['target'] = target
    # with app.app_context():
    # subprocess.call(['python','/Users/Fatima/Documents/GitHub/eeg-app/backend/model_files/preprocess.py'])
    # result=subprocess.run(preprocess.run(target_file=target))
    seiz_len,total_length=preprocess.run(target_file=target)
    conf = (seiz_len/total_length)*100
    conf=float("{:.2f}".format(conf))
    return jsonify({'data':conf})
    # return jsonify({'data':0.0})

@app.route('/rawDataModel',methods=['POST'])
def load_model_():
    data = request.get_json()
    print(data)
    name = data['filename']
    url = data['url']
    print("url"+url)
    print("name"+name)

    target = 'C:/Users/Fatima/Documents/GitHub/eeg-app/backend/csvFileUploads'
    if not os.path.isdir(target):
        os.mkdir(target)

    r = requests.get(url)
    with open(target+'/'+name,'wb') as f:
        f.write(r.content)

    target =target+'/'+name
    # print('file_n'+file_n)
    # subprocess.call(['python','/Users/Fatima/Documents/GitHub/eeg-app/backend/model_files/singlefile_pred.py'])
    result=singlefile_pred.run_(target_file=target)
    # subprocess.run(singlefile_pred.run_(target_file=target))  
    # result=subprocess.check_output(singlefile_pred.run_(file_n))
    # queue = Queue()
    # p = Process(target=singlefile_pred.run_, args=(file_n))
    # p.start()
    # p.join()
    # threshold = singlefile_pred.pc
    threshold = result
    return jsonify({'data':threshold})
    # return jsonify({'data':'data'})

if __name__ == "__main__":
    app.run(HOST, port='4000',debug=True)
    


