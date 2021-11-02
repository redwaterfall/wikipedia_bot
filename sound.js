const googleTTS = require('google-tts-api'); // CommonJS
const puppeteer = require('puppeteer');

let url = "https://www.wikipedia.org/";
async function findWikiNews(searchWord){
    try{
        const browser = await puppeteer.launch({headless:true});
        const page = await browser.newPage();
        
        await page.goto(url);
        
        await page.waitForSelector('#searchInput');
        await page.$eval('#searchInput', (el,search) => el.value = search, searchWord);
        await page.keyboard.press(String.fromCharCode(13));


        await page.waitForSelector('#firstHeading');
        const [getXpath] = await page.$x('//*[@id="mw-content-text"]/div[1]/p[1]');
        const getMsg = await page.evaluate(name => name.innerText, getXpath);
        console.log(getMsg);

        await browser.close();
        return String(getMsg);

    }
    catch(err){
        console.log(err);
    }

}


async function getAudioURL(searchWord){
    
 let infoMsg = await findWikiNews(searchWord);

    try{
      return  await googleTTS.getAudioUrl(""+infoMsg.substring(0,200), {
            lang: 'no-NO',
            slow: false,
            host: 'https://translate.google.com',
          });
        
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
  getAudioURL
}  