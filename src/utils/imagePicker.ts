import ImagePicker from 'react-native-image-crop-picker'

export default function imagePickerFunction(width: number, height: number, callbackFn: any) {
  return (
    ImagePicker.openPicker({
        width: 1200,
        height: 1200,
        cropping: true,

      })  .then(image => {
        console.log("reached img picjker")
        callbackFn(image.path);
      })
      .catch(err => {
        console.log('ImageErr', err);
      })
  )
}