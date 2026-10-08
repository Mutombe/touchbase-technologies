import { VideoConference, SpeakerHigh, ProjectorScreen, SecurityCamera, Network, Headset, Cloud, Cpu, VideoCamera, Monitor, WifiHigh } from '@phosphor-icons/react';

const byName = { VideoConference, SpeakerHigh, ProjectorScreen, SecurityCamera, Network, Headset, Cloud, VideoCamera, Monitor, WifiHigh };

export const solutionIcon = (name) => byName[name] || Cpu;
