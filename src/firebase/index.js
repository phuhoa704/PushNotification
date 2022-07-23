import React, { useState } from 'react';
import { db } from './../configs/firebase';
import { collection, query, where, onSnapshot, FieldPath, doc, getDoc } from 'firebase/firestore';
const Firestore = (collect, condition) => {
    const [state, setstate] = useState([]);
    React.useEffect(() => {
        if (!condition.compareValue || !condition.compareValue.length) {
            setstate([]);
            return;
        }
        const q = query(collection(db, collect), where(condition.fieldName, condition.oper, condition.compareValue));
        const unsubcribe = onSnapshot(q, (querySnapshot) => {
            const getClass = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                getClass.push(data);
            })
            setstate(getClass);
        })
    }, [collect, condition]);
    return state;
}
export const NoWhereCondition = async (collect, docId) => {
    const docRef = doc(db, collect, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const members = docSnap.get('users');
        return members
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}
export const SelectOnCollection = (collect) =>{
    const state = [];
    const q = query(collection(db, collect));
    const unsubcribe = onSnapshot(q, (querySnapshot) => {
        const getClass = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            getClass.push(data);
        })
        state.push(...getClass);
    })
    return state;
}


export default Firestore;