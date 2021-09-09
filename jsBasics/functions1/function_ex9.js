
function extractLanguage(code) {
  let codeSplit = code.split('.');
  let codeSplit2 = codeSplit[0].split('_');
  console.log(codeSplit2[1]);
}




extractLanguage('en_US.UTF-8');  // 'en'
extractLanguage('en_GB.UTF-8');  // 'en'
extractLanguage('ko_KR.UTF-16'); // 'ko'
