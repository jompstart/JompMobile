import * as Font from 'expo-font';
export async function loadAppFonts() {
  return await Font.loadAsync({
    'AvenirLTStd-Black': require('../../assets/fonts/AvenirLTStd-BlackOblique.otf'),
    'AvenirLTStd-BlackOblique': require('../../assets/fonts/AvenirLTStd-BlackOblique.otf'),
    'AvenirLTStd-Book': require('../../assets/fonts/AvenirLTStd-Book.otf'),
    'AvenirLTStd-BookOblique': require('../../assets/fonts/AvenirLTStd-BookOblique.otf'),
    'AvenirLTStd-Heavy': require('../../assets/fonts/AvenirLTStd-Heavy.otf'),
    'AvenirLTStd-HeavyOblique': require('../../assets/fonts/AvenirLTStd-HeavyOblique.otf'),
    'AvenirLTStd-Light': require('../../assets/fonts/AvenirLTStd-Light.otf'),
    'AvenirLTStd-LightOblique': require('../../assets/fonts/AvenirLTStd-LightOblique.otf'),
    'AvenirLTStd-Medium': require('../../assets/fonts/AvenirLTStd-Medium.otf'),
    'AvenirLTStd-MediumOblique': require('../../assets/fonts/AvenirLTStd-MediumOblique.otf'),
    'AvenirLTStd-Roman': require('../../assets/fonts/AvenirLTStd-Roman.otf'),
    'AvenirLTStd-Oblique': require('../../assets/fonts/AvenirLTStd-Oblique.otf'),
  });
}
