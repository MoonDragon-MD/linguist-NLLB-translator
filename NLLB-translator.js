// TTS Native Windows for linguist by MoonDragon ( https://github.com/MoonDragon-MD/linguist-NLLB-translator )
class NllbTranslator {
  apiPath = 'http://127.0.0.1:6060/translate';

  translate = async (text, from, to, method = 'GET') => {
      // Make sure that `text` is always an array, even if it is only one word
      const texts = Array.isArray(text) ? text : [text];
      const translations = [];

      for (const singleText of texts) {
          const isSingleWord = singleText.trim().indexOf(' ') === -1;
          const params = {
              source: isSingleWord ? [singleText] : singleText,
              src_lang: this.formatLanguage(from),
              tgt_lang: this.formatLanguage(to),
          };

          try {
              let response;
              if (method === 'GET') {
                  const queryString = new URLSearchParams(params).toString();
                  response = await fetch(`${this.apiPath}?${queryString}`, {
                      method: 'GET',
                      headers: {
                          'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:99.0) Gecko/20100101 Firefox/99.0',
                         'Accept': '*/*',
                      },
                  });
              } else if (method === 'POST') {
                  response = await fetch(this.apiPath, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(params),
                  });
              } else {
                  throw new Error(`Method ${method} not supported`);
              }

              if (!response.ok) {
                  throw new Error(`HTTP Error! Status: ${response.status}`);
              }

              const data = await response.json();
              translations.push(data.translation);
          } catch (error) {
              console.error('Error during translation:', error);
              throw error;
          }
      }

      return texts.length === 1 ? translations[0] : translations;
  };

  translateBatch = async (texts, from, to, method = 'GET') => {
    const results = await this.translate(texts, from, to, method);
    return results; // Make sure the API handles batches correctly
  };

  checkLimitExceeding = (text) => {
    const textLength = Array.isArray(text)
      ? text.reduce((len, t) => len + t.length, 0)
      : text.length;
    return textLength > this.getLengthLimit();
  };

  getLengthLimit = () => 4000;

  getRequestsTimeout = () => 300;

  static isSupportedAutoFrom = () => true;

  static getSupportedLanguages = () => [
    'af', 'ak', 'am', 'ar', 'as', 'ay', 'az', 'be', 'bg', 'bho', 'bm', 'bn', 'bs', 'ca', 'ceb', 'ckb', 'co', 'cs', 'cy', 'da',
    'de', 'doi', 'dv', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'fi', 'fr', 'fy', 'ga', 'gd', 'gl', 'gn', 'gom', 'gu',
    'ha', 'haw', 'hi', 'hmn', 'hr', 'ht', 'hu', 'hy', 'id', 'ig', 'ilo', 'is', 'it', 'iw', 'ja', 'jw', 'ka', 'kk', 'km', 'kn',
    'ko', 'kri', 'ku', 'ky', 'la', 'lb', 'lg', 'ln', 'lo', 'lt', 'lus', 'lv', 'mai', 'mg', 'mi', 'mk', 'ml', 'mn', 'mni-Mtei', 'mr',
    'ms', 'mt', 'my', 'ne', 'nl', 'no', 'nso', 'ny', 'om', 'or', 'pa', 'pl', 'ps', 'pt', 'qu', 'ro', 'ru', 'rw', 'sa', 'sd',
    'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'st', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tr',
    'ts', 'tt', 'ug', 'uk', 'ur', 'uz', 'vi', 'xh', 'yi', 'yo', 'zh-CN', 'zh-TW', 'zu',
  ];

  formatLanguage(lang) {
    const languageMapping = {
      'af': 'afr_Latn',
      'ak': 'aka_Latn',
      'am': 'amh_Ethi',
      'ar': 'arb_Arab',
      'as': 'asm_Beng',
      'ay': 'ayr_Latn',
      'az': 'azj_Latn',
      'be': 'bel_Cyrl',
      'bg': 'bul_Cyrl',
      'bn': 'ben_Beng',
      'bs': 'bos_Latn',
      'ca': 'cat_Latn',
      'cs': 'ces_Latn',
      'cy': 'cym_Latn',
      'da': 'dan_Latn',
      'de': 'deu_Latn',
      'el': 'ell_Grek',
      'en': 'eng_Latn',
      'eo': 'epo_Latn',
      'es': 'spa_Latn',
      'et': 'est_Latn',
      'eu': 'eus_Latn',
      'fa': 'fao_Latn',
      'fi': 'fin_Latn',
      'fr': 'fra_Latn',
      'ga': 'gla_Latn',
      'gl': 'gle_Latn',
      'gu': 'guj_Gujr',
      'ha': 'hau_Latn',
      'hi': 'hin_Deva',
      'hr': 'hrv_Latn',
      'hu': 'hun_Latn',
      'hy': 'hye_Armn',
      'id': 'ind_Latn',
      'is': 'isl_Latn',
      'it': 'ita_Latn',
      'ja': 'jav_Latn',
      'jw': 'jv_Latn',
      'ka': 'kat_Geor',
      'kk': 'kaz_Cyrl',
      'km': 'khm_Khmr',
      'kn': 'kan_Knda',
      'ko': 'kor_Hang',
      'ku': 'kuw_Latn',
      'ky': 'kir_Cyrl',
      'la': 'lat_Latn',
      'lb': 'ltz_Latn',
      'lg': 'lug_Latn',
      'ln': 'lin_Latn',
      'lo': 'lao_Laoo',
      'lt': 'lit_Latn',
      'lv': 'lvs_Latn',
      'mg': 'mlg_Latn',
      'mi': 'mri_Latn',
      'mk': 'mkd_Cyrl',
      'ml': 'mlt_Latn',
      'mn': 'mnk_Cyrl',
      'mr': 'mar_Deva',
      'ms': 'msa_Latn',
      'mt': 'mlt_Latn',
      'my': 'mya_Mymr',
      'ne': 'nep_Deva',
      'nl': 'nld_Latn',
      'no': 'nob_Latn',
      'ny': 'nya_Latn',
      'pa': 'pan_Guru',
      'pl': 'pol_Latn',
      'pt': 'por_Latn',
      'qu': 'quy_Latn',
      'ro': 'ron_Latn',
      'ru': 'rus_Cyrl',
      'rw': 'kin_Latn',
      'sa': 'san_Deva',
      'sd': 'snd_Arab',
      'si': 'sin_Sinh',
      'sk': 'slk_Latn',
      'sl': 'slv_Latn',
      'sm': 'smo_Latn',
      'sn': 'sna_Latn',
      'so': 'som_Latn',
      'sq': 'sqi_Latn',
      'sr': 'srp_Cyrl',
      'sv': 'swe_Latn',
      'sw': 'swh_Latn',
      'ta': 'tam_Taml',
      'te': 'tel_Telu',
      'tg': 'tgk_Cyrl',
      'th': 'tha_Thai',
      'ti': 'tir_Ethi',
      'tr': 'tur_Latn',
      'uk': 'ukr_Cyrl',
      'ur': 'urd_Arab',
      'uz': 'uzn_Latn',
      'vi': 'vie_Latn',
      'xh': 'xho_Latn',
      'yi': 'yid_Hebr',
      'yo': 'yor_Latn',
      'zu': 'zul_Latn',
    };

    return languageMapping[lang] || `${lang}_Latn`; // Returns the mapped value or adds '_Latn'
  }
}

NllbTranslator;
