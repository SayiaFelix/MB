import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class FirebaseService {
    constructor(private firestore: AngularFirestore) { }
    public addComment(requestId: string, data: any) {
        // for consistency
        // const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        // ref.update({ updatedAt: timestamp })
        data['created_on'] = new Date();
        data['created_by'] = JSON.parse(localStorage.getItem('user')).id;
        return new Promise<any>((resolve, reject) => {
            this.firestore.collection("chats").doc(requestId).collection('comments').add(data).then(res => { }, err => reject(err));
        });
    }
    public getChat(requestId: number) {
        return this.firestore.collection('chats', ref => ref
        .where("id", "==", requestId)).snapshotChanges(
           
        );
    }
    public getComments(requestId: string) {
        return this.firestore.collection('chats')
        .doc(requestId).collection('comments', ref => ref
        .orderBy("created_on", "asc")).snapshotChanges();
    }
}
