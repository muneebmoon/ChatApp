import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../firebase';

export default function PhoneAuthScreen() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  const sendVerification = async () => {
    const confirmation = await auth.signInWithPhoneNumber(phone);
    setVerificationId(confirmation.verificationId);
  };

  const confirmCode = async () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
    await auth.signInWithCredential(credential);
  };

  return (
    <View>
      {!verificationId ? (
        <>
          <TextInput placeholder="Phone Number" onChangeText={setPhone} />
          <Button title="Send Verification" onPress={sendVerification} />
        </>
      ) : (
        <>
          <TextInput placeholder="Verification Code" onChangeText={setCode} />
          <Button title="Verify Code" onPress={confirmCode} />
        </>
      )}
    </View>
  );
}
