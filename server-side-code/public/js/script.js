const video = document.getElementById('video')
var db = firebase.firestore();

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('js/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('js/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('js/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('js/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}
var score = 0;
video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  var co = 0
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    try{
      const ele = document.getElementById("status")
      score = detections[0].detection._score;
      ele.innerHTML = `
      <p>Confidence of Face Detection::${detections[0].detection._score}</p>
      `
  
    }
    catch{
      console.log("Absence Detected")
      const ele = document.getElementById("status")
      ele.innerHTML = `
      <p>Absence Detected</p>
      `
      co=co+1
      //const ide = document.getElementById("sid")
      //console.log(ide.value)
      const inp = document.getElementById("inp1")
      const strid = inp1.value;
      console.log(firebase)
      var dt = new Date()
      db.collection(strid+"/"+firebase.auth().currentUser.uid+"/atRec").add({
        time: "Absent Time"+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds(),
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
    }
    /**
     *     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

     */
  }, 500)
})