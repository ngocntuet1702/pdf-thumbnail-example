import * as React from 'react';

import {Button, Image, StyleSheet, Text, View} from 'react-native';
import PdfThumbnail, {type ThumbnailResult} from 'react-native-pdf-thumbnail';

type ErrorType = {code: string; message: string};

export default function App() {
  const [thumbnail, setThumbnail] = React.useState<
    ThumbnailResult | undefined
  >();
  const [error, setError] = React.useState<ErrorType | undefined>();

  const onPress = async () => {
    try {
      const uri1 = 'https://www.sldttc.org/allpdf/21583473018.pdf';
      const result = await PdfThumbnail.generate(uri1, 0, 100);
      setThumbnail(result);
      setError(undefined);
    } catch (err) {
      setThumbnail(undefined);
      setError(err as ErrorType);
    }
  };

  const thumbnailResult = thumbnail ? (
    <>
      <Image
        source={thumbnail}
        resizeMode="contain"
        style={styles.thumbnailImage}
      />
      <Text style={styles.thumbnailInfo}>uri: {thumbnail.uri}</Text>
      <Text style={styles.thumbnailInfo}>width: {thumbnail.width}</Text>
      <Text style={styles.thumbnailInfo}>height: {thumbnail.height}</Text>
    </>
  ) : null;

  const thumbnailError = error ? (
    <>
      <Text style={styles.thumbnailError}>Error code: {error.code}</Text>
      <Text style={styles.thumbnailError}>Error message: {error.message}</Text>
    </>
  ) : null;

  return (
    <View style={styles.container}>
      <View style={styles.thumbnailPreview}>
        {thumbnailResult}
        {thumbnailError}
      </View>
      <Button onPress={onPress} title="Show PDF File" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  thumbnailPreview: {
    padding: 20,
    alignItems: 'center',
  },
  thumbnailImage: {
    width: 400,
    height: 400,
    marginBottom: 20,
    backgroundColor: 'grey',
  },
  thumbnailInfo: {
    color: 'darkblue',
  },
  thumbnailError: {
    color: 'crimson',
  },
});
