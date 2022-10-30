
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const VIDEOPLAYER_KEY = 'videoplayer-current-time';
inPlayer();
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const onPlay = function (player) {
    try {
        const getseconds = player.seconds;
        // console.log(getseconds);
       const stringifyData = JSON.stringify(getseconds);
       
       localStorage.setItem(VIDEOPLAYER_KEY, stringifyData);
 
   } catch (error) {
    //  console.error(error);
   }
};

player.on('timeupdate', throttle(onPlay, 1000));

function inPlayer() {
    const saveData = localStorage.getItem(VIDEOPLAYER_KEY);
    if (saveData) {
        try {
        const parseData = JSON.parse(saveData);
            // console.log(parseData); 
           return parseData;
        } catch (error) {
            
            console.error(error);
        }
       
    }
}
// console.log(inPlayer());
const loadPlayTime = inPlayer();
if (loadPlayTime) {
  player.setCurrentTime(loadPlayTime);
}
