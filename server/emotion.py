from PIL import Image
from matplotlib import pyplot as plt
import numpy as np
# import face_recognition
import keras
from keras.models import load_model
import cv2
import sys
# app.get('/emotion', (req, res) => {
#         var spawn = require('child_process').spawn;
#         var process = spawn('python', ["./emotion.py", '../uploads/url.png'])
#         process.stdout.on('data', function(data) {
#             res.send(data.toString())
#         })
# })

# app.get('/getRandomImage/:id', (req, res) => {
#    var reqUrl = req.url
#    var index = reqUrl.split('/')
#     var link = '../uploads/' + index[index.length - 1] + '.jpg';
#     console.log(link)
#     res.sendFile(path.join(__dirname, link))
# })

# emotion_dict= {'Negative': 0, 'Negative': 5, 'Normal': 4, 'Negative': 1, 'Positive': 6, 'Negative': 2, 'Positive': 3}

# face_image = cv2.imread('../uploads/url.png')
# face_image = cv2.resize(face_image, (48,48))
# face_image = cv2.cvtColor(face_image, cv2.COLOR_BGR2GRAY)
# face_image = np.reshape(face_image, [1, face_image.shape[0], face_image.shape[1], 1])
# model = load_model("./model_v6_23.hdf5")
# predicted_class = np.argmax(model.predict(face_image))
# label_map = dict((v,k) for k,v in emotion_dict.items()) 
# predicted_label = label_map[predicted_class]
# print(predicted_label)