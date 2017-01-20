import MSTranslator from 'mstranslator';

const API_KEY = '7770f947a5894ef894edee206306fc0a';

class Translator {
  constructor() {
    this.client = new MSTranslator({
      api_key: API_KEY
    }, true);

    // Setup empty map of languages to language codes
    this.languageMap = {};

    // Get all language codes and names in memory
    this.initLanguages();
  }

  // Create map of language names to ISO
  createMap() {
    const lenCodes = this.languageCodes.length;
    const lenNames = this.languageNames.length;
    console.log(`i have ${lenCodes} languageCodes and ${lenNames} languageNames`);

    for (let i = 0; i < lenCodes; i++) {
      const languageCode = this.languageCodes[i];
      const languageName = this.languageNames[i];
      this.languageMap[languageName] = languageCode;
    }

    console.log('Language map complete');
    console.log(this.languageMap);
  }

  // Get the available language names and language codes
  // and hold them in memory.
  initLanguages() {
    this.client.getLanguagesForTranslate((err, data) => {
      console.log('getting languages');
      // console.log(data);
      this.languageCodes = data;
      console.log(this.languageCodes);

      // Now get the langauge string names
      const params = { locale: 'en', languageCodes: this.languageCodes };
      this.client.getLanguageNames(params, (error, langData) => {
        console.log(langData);
        this.languageNames = langData;
        this.createMap();
      });
    });
  }

  getLanguageNames() {
    return this.languageNames;
  }

  translate(text, from, to, cb) {
    // Setup params
    const params = {
      text,
      from: this.languageMap[from],
      to: this.languageMap[to]
    };

    // Don't worry about access token, it will be auto-generated if needed.
    this.client.translate(params, (err, data) => {
      console.log(`TRANSLATING ${text} from ${params.from} to ${params.to}`);
      console.log(data);
      cb(data);
    });
  }

}

export default Translator;
