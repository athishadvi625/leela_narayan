import rawData from './siteData.json';
import { SiteData } from './types';

export const siteData: SiteData = rawData as unknown as SiteData;
export default siteData;
