import { DcxPosition } from './generic';


export interface AvailableSpace {
    spaceTop: number;
    spaceBottom: number;
    spaceLeft: number;
    spaceRight: number;
}


export interface TooltipPositionOption {
    position: DcxPosition;
    space: number;
}


export interface TooltipConfig {
    margin: number;
    adjustDelay: number;
    maxWidth: number;
}

export type TooltipArrowAlignment = 'left' | 'center' | 'right';