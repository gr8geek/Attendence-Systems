const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { user } = require('firebase-functions/lib/providers/auth');
admin.initializeApp()
exports.setName = functions.https.onCall((data,context) => {
    return admin.firestore().collection('users').doc(context.auth.uid).set({
        name:data.name
    })

});
exports.addAbsence = functions.https.onCall((data,context) => {
    if(!context.auth){
        throw new functions.https.HttpsError('unauthenticated'
        ,'Please drop your black hat ;-)')
    }
    console.log("Attendance ID===",con)
    const ref = admin.firestore().collection(data.aid).doc(context.auth.uid)
    return ref.set({
        absentat:  data.time 
    })
    
});

exports.newUserSignup = functions.auth.user().onCreate(user =>{
    console.log("create new user",user.email, user.uid)
    return admin.firestore().collection('users').doc(user.uid).set({
        email:user.email,
    })
})


exports.userDeleated = functions.auth.user().onDelete(user =>{
    const doc = admin.firestore().collection('users').doc(users.uid)
    return doc.delete()
})


