import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import App from './App'

var i = 0;

// var music = document.getElementById("music")
// music.addEventListener('ended', function() {
//     music.pause();
//     var i = Math.floor((Math.random() * 17) + 1);
//     var source = '/static/' + i.toString() + '.mp3'
//     music.src = source
//     music.load();
//     music.play();
// })



// The buttons to start & stop stream and to capture the image
var btnStart = document.getElementById( "btn-start" );
var btnStop = document.getElementById( "btn-stop" );
var btnCapture = document.getElementById( "btn-capture" );
var btnUpload = document.getElementById("btn-upload")
// The stream & capture
var stream = document.getElementById( "stream" );
var capture = document.getElementById( "capture" );
var snapshot = document.getElementById( "snapshot" );


// // The video stream
var cameraStream = null;

// // Attach listeners
btnStart.addEventListener( "click", startStreaming );
btnStop.addEventListener( "click", stopStreaming );
btnUpload.addEventListener("click", upload);


function startStreaming() {

	var mediaSupport = 'mediaDevices' in navigator;

	if( mediaSupport && null == cameraStream ) {

		navigator.mediaDevices.getUserMedia( { video: true } )
		.then( function( mediaStream ) {

			cameraStream = mediaStream;

			stream.srcObject = mediaStream;

			stream.play();
		})
		.catch( function( err ) {

			console.log( "Unable to access camera: " + err );
		});
	}
	else {

		alert( 'Your browser does not support media devices.' );

		return;
	}
}

function stopStreaming() {

	if( null != cameraStream ) {

		var track = cameraStream.getTracks()[ 0 ];

		track.stop();
		stream.load();

		cameraStream = null;
	}
}

btnCapture.addEventListener( "click", captureSnapshot );

function dataURItoBlob( dataURI ) {

	var byteString = atob( dataURI.split( ',' )[ 1 ] );
	var mimeString = dataURI.split( ',' )[ 0 ].split( ':' )[ 1 ].split( ';' )[ 0 ];
	
	var buffer	= new ArrayBuffer( byteString.length );
	var data	= new DataView( buffer );
	
	for( var i = 0; i < byteString.length; i++ ) {
	
		data.setUint8( i, byteString.charCodeAt( i ) );
	}
	
	return new Blob( [ buffer ], { type: mimeString } );
}

function captureSnapshot() {

	if( null != cameraStream ) {
        i++;
		var ctx = capture.getContext( '2d' );
		ctx.drawImage( stream, 0, 0, capture.width, capture.height );
	}
}

function upload() {
    if (i == 0)
        alert('There is no photo')
    else {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				document.getElementById("result").innerText = request.responseText
			}
			else {
				document.getElementById("result").innerText = "Waiting a minute..."
			}
		}
        request.open( "POST", "/upload/url", true );
        var data	= new FormData();
        var dataURI	= capture.toDataURL( "image/png" );
        var imageData   = dataURItoBlob( dataURI );
        data.append( "myfile", imageData, 'image.png' );
		request.send( data );
    }
}

ReactDOM.render(
        <App/>,
    document.getElementById("root")
)

