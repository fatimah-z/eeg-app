import os
import os.path as op
from turtle import mode
from matplotlib.font_manager import json_dump
import numpy as np
import mne
import flask 
import json

from flask import Flask, jsonify, send_file,stream_with_context
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/view', methods=['GET'])
def getEEG():
    
    raw = mne.io.read_raw_brainvision('C:/Users/Fatima/downloads/Control1025.vhdr',misc='auto')
    raw.load_data()  
    # raw.resample(256, npad="auto") 
    # raw.filter(1, 30, fir_design='firwin', picks=['eeg'])
    # raw.set_eeg_reference('average', projection=True).apply_proj()
    # events_from_annot,event_dict = mne.events_from_annotations(raw)
                           
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
    data,times = raw.get_data(return_times=True)
    print(data)
    print(times)
    arr1 =data.tolist()
    arr2 = times.tolist()
    list1={'arr1':arr1,'arr2':arr2}

    #writing to a file
    # with open('eegdata.json','w') as file1:
    #    json.dump(list1,file1)

    
    #--------------------------------------------------------------------------------
    return jsonify({'arr1':arr1,'arr2':arr2})
    # return send_file('eegdata.json')
   
   

if __name__ == "__main__":
    app.run(host='192.168.100.95', port='4000',debug=True)
    


