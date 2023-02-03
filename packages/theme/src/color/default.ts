import { css } from '@linaria/core';

import {
  BERRY_RED,
  BERRY_RED_ALPHA,
  BLACK_ALFA,
  BLUE_GREY,
  EMERALD_GREEN,
  EMERALD_GREEN_ALPHA,
  GRACE,
  GRACE_ALPHA,
  GRADIENT,
  GREEN,
  GREEN_ALFA,
  GREY,
  PRESET,
  PURPLE,
  PURPLE_ALFA,
  SUNNY_YELLOW,
  SUNNY_YELLOW_ALPHA,
  WHITE_ALFA,
} from './vars';

export const COLORS_DEFAULT_MAP = `
 ${GREY[0]}: #ffffff;
 ${GREY[25]}: #f8f8f8;
 ${GREY[50]}: #f2f2f2;
 ${GREY[100]}: #e6e6e6;
 ${GREY[150]}: #d9d9d9;
 ${GREY[200]}: #cccccc;
 ${GREY[250]}: #bfbfbf;
 ${GREY[300]}: #b2b2b2;
 ${GREY[350]}: #a6a6a6;
 ${GREY[400]}: #999999;
 ${GREY[450]}: #8c8c8c;
 ${GREY[500]}: #808080;
 ${GREY[550]}: #737373;
 ${GREY[600]}: #666666;
 ${GREY[650]}: #595959;
 ${GREY[700]}: #4d4d4d;
 ${GREY[750]}: #404040;
 ${GREY[800]}: #333333;
 ${GREY[850]}: #262626;
 ${GREY[900]}: #1a1a1a;
 ${GREY[1000]}: #000000;

 ${PURPLE[5]}: #f6f6f6;
 ${PURPLE[10]}: #eeeeff;
 ${PURPLE[25]}: #d5d5fe;
 ${PURPLE[50]}: #aaabfd;
 ${PURPLE[75]}: #8082fb;
 ${PURPLE[100]}: #5558fa;
 ${PURPLE[115]}: #484bd5;
 ${PURPLE[125]}: #4042bc;
 ${PURPLE[150]}: #282c7d;

 ${GREEN[5]}: #f2fefa;
 ${GREEN[10]}: #e6fdf5;
 ${GREEN[25]}: #c1f9e5;
 ${GREEN[50]}: #83f4cb;
 ${GREEN[75]}: #45eeb1;
 ${GREEN[100]}: #07e897;
 ${GREEN[115]}: #06d58b;
 ${GREEN[125]}: #06c37f;
 ${GREEN[135]}: #35a574;
 ${GREEN[150]}: #03734b;

 ${BLACK_ALFA[48]}: rgba(0, 0, 0, 0.48);
 ${BLACK_ALFA[24]}: rgba(0, 0, 0, 0.24);
 ${BLACK_ALFA[16]}: rgba(0, 0, 0, 0.16);
 ${BLACK_ALFA[8]}: rgba(0, 0, 0, 0.08);
 ${BLACK_ALFA[4]}: rgba(0, 0, 0, 0.04);

 ${WHITE_ALFA[48]}: rgba(255, 255, 255, 0.48);
 ${WHITE_ALFA[24]}: rgba(255, 255, 255, 0.24);
 ${WHITE_ALFA[16]}: rgba(255, 255, 255, 0.16);
 ${WHITE_ALFA[8]}: rgba(255, 255, 255, 0.08);
 ${WHITE_ALFA[4]}: rgba(255, 255, 255, 0.04);

 ${PURPLE_ALFA[48]}: rgba(85, 88, 250, 0.48);
 ${PURPLE_ALFA[24]}: rgba(85, 88, 250, 0.24);
 ${PURPLE_ALFA[16]}: rgba(85, 88, 250, 0.16);
 ${PURPLE_ALFA[8]}: rgba(85, 88, 250, 0.08);
 ${PURPLE_ALFA[4]}: rgba(85, 88, 250, 0.04);

 ${GREEN_ALFA[48]}: rgba(7, 232, 151, 0.48);
 ${GREEN_ALFA[24]}: rgba(7, 232, 151, 0.24);
 ${GREEN_ALFA[16]}: rgba(7, 232, 151, 0.16);
 ${GREEN_ALFA[8]}: rgba(7, 232, 151, 0.08);
 ${GREEN_ALFA[4]}: rgba(7, 232, 151, 0.04);

 ${BLUE_GREY[5]}: #f4f4f5;
 ${BLUE_GREY[10]}: #e9e9ea;
 ${BLUE_GREY[20]}: #d3d4d6;
 ${BLUE_GREY[30]}: #bcbfc1;
 ${BLUE_GREY[40]}: #a6a9ac;
 ${BLUE_GREY[50]}: #909497;
 ${BLUE_GREY[60]}: #7a7e83;
 ${BLUE_GREY[70]}: #63696e;
 ${BLUE_GREY[80]}: #4d5359;
 ${BLUE_GREY[90]}: #373e45;
 ${BLUE_GREY[100]}: #212830;

 ${BERRY_RED[15]}: #fce4e6;
 ${BERRY_RED[25]}: #f9d3d5;
 ${BERRY_RED[50]}: #f4a7ab;
 ${BERRY_RED[75]}: #ee7a82;
 ${BERRY_RED[100]}: #e84e58;
 ${BERRY_RED[115]}: #c5424b;
 ${BERRY_RED[125]}: #ae3b42;
 ${BERRY_RED[150]}: #74272c;
 
 ${BERRY_RED_ALPHA[15]}: rgba(232, 78, 88, 0.15);
 ${BERRY_RED_ALPHA[25]}: rgba(232, 78, 88, 0.25);

 ${SUNNY_YELLOW[15]}: #fdf9e6;
 ${SUNNY_YELLOW[75]}: #f2db72;
 ${SUNNY_YELLOW[100]}: #f0d559;
 ${SUNNY_YELLOW[115]}: #ccb54c;

 ${SUNNY_YELLOW_ALPHA[15]}: rgba(240, 213, 89, 0.15);
 ${SUNNY_YELLOW_ALPHA[50]}: rgba(240, 213, 89, 0.5);

 ${GRACE[1]}: #02e497;
 ${GRACE[2]}: #0dc8a2;
 ${GRACE[3]}: #19abac;
 ${GRACE[4]}: #229485;
 ${GRACE[5]}: #2883bb;
 ${GRACE[6]}: #316cc4;
 ${GRACE[7]}: #3a56cc;
 ${GRACE[8]}: #5c00ec;
 ${GRACE[9]}: #7818cf;
 ${GRACE[10]}: #8828bb;
 ${GRACE[11]}: #9933ad;
 ${GRACE[12]}: #a53da0;
 ${GRACE[13]}: #ae4597;
 ${GRACE[14]}: #bc5191;
 ${GRACE[15]}: #cc5693;
 ${GRACE[16]}: #e05a9f;

 ${GRACE_ALPHA[1]}: rgba(2, 228, 151, 0.1);
 ${GRACE_ALPHA[2]}: rgba(13, 200, 162, 0.1);
 ${GRACE_ALPHA[3]}: rgba(25, 171, 172, 0.1);
 ${GRACE_ALPHA[4]}: rgba(34, 148, 181, 0.1);
 ${GRACE_ALPHA[5]}: rgba(40, 131, 187, 0.1);
 ${GRACE_ALPHA[6]}: rgba(49, 108, 196, 0.1);
 ${GRACE_ALPHA[7]}: rgba(58, 86, 204, 0.1);
 ${GRACE_ALPHA[8]}: rgba(92, 0, 236, 0.1);
 ${GRACE_ALPHA[9]}: rgba(120, 24, 207, 0.1);
 ${GRACE_ALPHA[10]}: rgba(139, 40, 187, 0.1);
 ${GRACE_ALPHA[11]}: rgba(153, 51, 173, 0.1);
 ${GRACE_ALPHA[12]}: rgba(165, 61, 160, 0.1);
 ${GRACE_ALPHA[13]}: rgba(174, 69, 151, 0.1);
 ${GRACE_ALPHA[14]}: rgba(188, 81, 145, 0.1);
 ${GRACE_ALPHA[15]}: rgba(204, 86, 147, 0.1);
 ${GRACE_ALPHA[16]}: rgba(224, 90, 159, 0.1);

 ${GRADIENT[1]}: linear-gradient(90deg, #BC5188 0%, #496DEB 29.17%, #0AE59A 100%);
 ${GRADIENT[2]}: linear-gradient(90deg, #0AE59A 0%, #316CC4 100%);
 ${GRADIENT[3]}: linear-gradient(180deg, rgba(85, 88, 250, 0.3) 0%, rgba(85, 88, 250, 0) 100%);
 ${GRADIENT[4]}: linear-gradient(180deg, rgba(2, 228, 151, 0.3) 0%, rgba(2, 228, 151, 0) 100%);

 ${EMERALD_GREEN[15]}: #d9f3ea;
 ${EMERALD_GREEN[75]}: #43c294;
 ${EMERALD_GREEN[100]}: #05ae71;

 ${EMERALD_GREEN_ALPHA[15]}: rgba(5, 174, 113, 0.15);
 ${EMERALD_GREEN_ALPHA[25]}: rgba(5, 174, 113, 0.25);

 ${PRESET.GREEN_LIGHT}: #d7e7e2;
 ${PRESET.GREEN_DARK}: #527771;
 ${PRESET.YELLOW_LIGHT}: #f9eed8;
 ${PRESET.YELLOW_DARK}: #9e9056;
 ${PRESET.SILVER_GRAY_LIGHT}: #d7d7d6;
 ${PRESET.SILVER_GRAY_DARK}: #6c6f71;
 ${PRESET.CHARCOAL_GRAY_LIGHT}: #e6e6e5;
 ${PRESET.CHARCOAL_GRAY_DARK}: #515558;
 ${PRESET.ORANGE_LIGHT}: #fae1d5;
 ${PRESET.ORANGE_DARK}: #9a754f;
 ${PRESET.RED_LIGHT}: #fbd6d5;
 ${PRESET.RED_DARK}: #98605b;
 ${PRESET.PINK_LIGHT}: #f5d5e5;
 ${PRESET.PINK_DARK}: #8a5273;
 ${PRESET.VIOLET_LIGHT}: #dfd7f7;
 ${PRESET.VIOLET_DARK}: #6a5b8c;
 ${PRESET.BLUE_LIGHT}: #d5e4f7;
 ${PRESET.BLUE_DARK}: #517086;
 ${PRESET.BROWN_LIGHT}: #e6d6d0;
 ${PRESET.BROWN_DARK}: #685c56;
 ${PRESET.GRASS_LIGHT}: #ecedcd;
 ${PRESET.GRASS_DARK}: #6d7b4e;
 ${PRESET.SEAMOUNT_LIGHT}: #e0f4f4;
 ${PRESET.SEAMOUNT_DARK}: #146c6c;
 ${PRESET.FINDED_WHITE}: #fdffaa;
 ${PRESET.FINDED_BLACK}: #675d00;
 ${PRESET.FOCUSED_WHITE}: #ffd3aa;
 ${PRESET.FOCUSED_BLACK}: #964f0d;

 ${PRESET.EMERALD_GREEN}: #05ae71;
 ${PRESET.EMERALD_GREEN_ALPHA}: rgba(5, 174, 113, 0.15);

`;

export const color = css`
  :global() {
    :root {
      ${COLORS_DEFAULT_MAP};
    }
  }
`;
