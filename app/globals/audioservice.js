import {AudioService} from 'sequencer';
import audioContext from './audiocontext';

let audioService = new AudioService(audioContext);
export default audioService;
