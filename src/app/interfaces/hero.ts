import { Images } from './images'
import { Comics } from './comics'
import { Series } from './series'
import { Stories } from './stories'
import { Events } from './events'
import { Urls } from './urls'
export interface Hero {
  id: number;
  name: string;
  description: string;
  modified: Date;
  thumbnail: Images;
  resourceURI: string;
  comics: Comics;
  series: Series;
  stories: Stories;
  events: Events;
  urls: Urls[];
}
