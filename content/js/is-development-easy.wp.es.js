import 'jquery-flot'
import $ from 'jquery'

import colors from 'libs/colors'

$(() => {
  const plotOpts = {
    grid: { show: false },
    colors: [colors.value[3], colors.value[1]],
    legend: {show: false},
    lines: {show: true}
  }
  $.plot($('#us-gdp'),
    [{data: [
      [1970, 23309.6209459064],
      [1971, 23775.2769229658],
      [1972, 24760.1453772345],
      [1973, 25908.9128017215],
      [1974, 25540.5010030208],
      [1975, 25239.919905729],
      [1976, 26347.809281996],
      [1977, 27286.2515144911],
      [1978, 28500.2404573534],
      [1979, 29082.5937779654],
      [1980, 28734.3992597646],
      [1981, 29191.9994879416],
      [1982, 28362.4946163409],
      [1983, 29406.2574686046],
      [1984, 31268.9756446518],
      [1985, 32306.8330567744],
      [1986, 33133.6954441913],
      [1987, 33975.6547953064],
      [1988, 35083.9690428182],
      [1989, 36033.3302026992],
      [1990, 36312.4141825874],
      [1991, 35803.8684213439],
      [1992, 36566.1737698527],
      [1993, 37078.04968394],
      [1994, 38104.9724675631],
      [1995, 38677.7150883663],
      [1996, 39681.5198579033],
      [1997, 40965.8466450522],
      [1998, 42292.8912011426],
      [1999, 43768.8849928326],
      [2000, 45055.817918284],
      [2001, 45047.4871976844],
      [2002, 45428.6456781274],
      [2003, 46304.0360895612],
      [2004, 47614.2798621765],
      [2005, 48755.6160606735],
      [2006, 49575.401013591],
      [2007, 49979.5338429195],
      [2008, 49364.6445500336],
      [2009, 47575.608562749],
      [2010, 48373.8788155779]
    ]}
    ], plotOpts)
  $.plot($('#china-gdp'),
    [{data: [
      [1970, 228.317702823625],
      [1971, 237.813838393538],
      [1972, 240.881888917967],
      [1973, 253.714372960062],
      [1974, 254.267484665894],
      [1975, 271.599476492383],
      [1976, 263.23062210942],
      [1977, 279.32454675135],
      [1978, 307.76619470515],
      [1979, 326.768369193998],
      [1980, 347.887413035502],
      [1981, 361.224710649125],
      [1982, 387.745580908334],
      [1983, 423.593498767967],
      [1984, 481.364595759347],
      [1985, 538.690827266253],
      [1986, 578.184040366224],
      [1987, 635.494603029004],
      [1988, 695.599054411093],
      [1989, 713.689527590362],
      [1990, 730.772489044822],
      [1991, 787.867435156269],
      [1992, 888.911004119008],
      [1993, 1000.61180975351],
      [1994, 1118.49957748173],
      [1995, 1227.55640691521],
      [1996, 1335.36268011202],
      [1997, 1443.77474185404],
      [1998, 1542.06412996664],
      [1999, 1645.98799567879],
      [2000, 1771.74150579539],
      [2001, 1905.61078010947],
      [2002, 2065.71857925612],
      [2003, 2258.91210541049],
      [2004, 2472.58655569402],
      [2005, 2738.2054599526],
      [2006, 3069.30478095137],
      [2007, 3487.84576561013],
      [2008, 3805.02599866378],
      [2009, 4142.03828597868],
      [2010, 4560.51258600929]
    ]}
    ], plotOpts)
  $.plot($('#singapore-gdp'),
    [{data: [
      [1970, 6506.93815264069],
      [1971, 7160.5122239392],
      [1972, 7979.90348499015],
      [1973, 8703.72794993439],
      [1974, 9113.74062631247],
      [1975, 9395.58583572787],
      [1976, 9959.17844956781],
      [1977, 10557.4226626636],
      [1978, 11338.2627635073],
      [1979, 12250.6453847958],
      [1980, 13308.9911813532],
      [1981, 14039.4416897518],
      [1982, 14400.3680159759],
      [1983, 15428.5448262145],
      [1984, 16472.0230125548],
      [1985, 16336.5151329596],
      [1986, 16569.0530613863],
      [1987, 18077.4572215322],
      [1988, 19583.4570098416],
      [1989, 20953.4182740361],
      [1990, 22178.4893943358],
      [1991, 22997.7845338278],
      [1992, 23898.8977032521],
      [1993, 25990.3140287576],
      [1994, 27939.6348618883],
      [1995, 29008.4995541899],
      [1996, 29951.0196044356],
      [1997, 31363.408990084],
      [1998, 29641.2258279364],
      [1999, 31197.6051202269],
      [2000, 33390.0584777032],
      [2001, 32191.9400902591],
      [2002, 33242.9863316237],
      [2003, 35233.1344804816],
      [2004, 38117.4105337566],
      [2005, 40020.2601607487],
      [2006, 42223.8913630418],
      [2007, 44191.2380925911],
      [2008, 42650.1020802336],
      [2009, 41133.2998100586],
      [2010, 46569.6795060716]
    ]}
    ], plotOpts)
})