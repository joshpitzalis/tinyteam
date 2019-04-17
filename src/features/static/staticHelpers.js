export const pullFileDataFromFirebase = (teamId, firestore) =>
  firestore
    .doc(`teams/${teamId}`)
    .get()
    .then(
      response => response.data().files
      // this.unpackTheFilesfromFirestore(response.data().files)
    );
