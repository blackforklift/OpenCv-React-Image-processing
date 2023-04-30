import cv2
import numpy as np
from flask import Flask, request, send_file, jsonify
from io import BytesIO
from flask_cors import CORS
import os
from PIL import Image 
app = Flask(__name__)
CORS(app)

@app.route('/rotate', methods=['POST'])
def rotate_image():

    img_file = request.files.get('file')
    angle = request.form.get('angle')

    img_bytes = np.frombuffer(img_file.read(), np.uint8)
    img = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)

    rows, cols, _ = img.shape


    M = cv2.getRotationMatrix2D((cols/2, rows/2), float(angle), 1)
    img_rotated = cv2.warpAffine(img, M, (cols, rows))

    ext = os.path.splitext(img_file.filename)[-1].lower()
    if ext == '.png':
        img_bytes = cv2.imencode('.png', img_rotated)[1]
    elif ext in ('.jpg', '.jpeg'):
        img_bytes = cv2.imencode('.jpeg', img_rotated, [int(cv2.IMWRITE_JPEG_QUALITY), 90])[1]
    else:
        return jsonify({'error': 'Unsupported image format'})

 
    return send_file(BytesIO(img_bytes), mimetype=f'image/{ext[1:]}')

CORS(app)
@app.route('/crop', methods=['POST'])

def crop():
    crop_file = request.files['file']
    
    x = int(request.form['x'])
    y = int(request.form['y'])
    h = int(request.form['height'])
    w = int(request.form['width'])

    print(x,y,w,h)

    img = cv2.imdecode(np.frombuffer(crop_file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
    if img is None:
        return jsonify({'error': 'Failed to decode'})
    cropped_img = img[y:y+h, x:w+x]
    cropped_img = cv2.imencode('.jpg', cropped_img)[1].tobytes()
    cropped_img = BytesIO(cropped_img)

    return send_file(cropped_img, mimetype='image/jpeg')

CORS(app)
@app.route('/size', methods=['POST'])
def resize_image():
    img_file = request.files['file']
    width =int( request.form['sizewidth'])
    height = int(request.form['sizeheight'])
    print(width,height)

    img_bytes = np.frombuffer(img_file.read(), np.uint8)
    img = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)

    resized_img = cv2.resize(img, (int(width), int(height)), interpolation=cv2.INTER_AREA)

    ext = os.path.splitext(img_file.filename)[-1]
    ext = ext.lower()

    if ext == '.png':
        img_bytes = cv2.imencode('.png', resized_img)[1]
    elif ext in ['.jpg', '.jpeg']:
        img_bytes = cv2.imencode('.jpeg', resized_img, [int(cv2.IMWRITE_JPEG_QUALITY), 90])[1]
    else:
        return jsonify({'error': 'Unsupported format'})

    return send_file(BytesIO(img_bytes), mimetype='image/'+ext[1:])

CORS(app)
@app.route('/flip', methods=['POST'])
def flip_image():
    img_file = request.files['file']
    axis = request.form['axis']

    img_bytes = np.frombuffer(img_file.read(), np.uint8)
    img = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)

    if axis == '0':
        img_flipped = cv2.flip(img, 0)
    elif axis == '1':
        img_flipped = cv2.flip(img, 1)
    else:
        return jsonify({'error': 'Invalid axis '})

    ext = os.path.splitext(img_file.filename)[-1]
    ext = ext.lower()

    if ext == '.png':
        img_bytes = cv2.imencode('.png', img_flipped)[1]
    elif ext in ['.jpg', '.jpeg']:
        img_bytes = cv2.imencode('.jpeg', img_flipped, [int(cv2.IMWRITE_JPEG_QUALITY), 90])[1]
    else:
        return jsonify({'error': 'Unsupported format'})

    return send_file(BytesIO(img_bytes), mimetype='image/'+ext[1:])



if __name__ == '__main__':
    app.run(debug=True)
