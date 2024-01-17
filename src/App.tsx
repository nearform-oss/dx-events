import {useState} from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import clsx from 'clsx';
import geo from './assets/ne_110m_admin_0_countries.json';
import events from './assets/events.csv?raw';
import {
  eventNameIndex,
  type DxEvent,
  eventTitleIndex,
  eventPersonIndex,
  eventCountryIndex,
} from './dx-event';
import EventHorizontalList from './EventHorizontalList';

// Const geoUrl =
//   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

const eventList = events
  .split('\n')
  .map((line) => line.split(','))
  .slice(1) as DxEvent[];

const geoUrl =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson';

const geoUrl2 =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_pacific_groupings.geojson';

const defaultCountry: SelectedCountry = {
  geo: undefined,
  dxEvents: [],
  //   Geo: {
  //     type: 'Feature',
  //     properties: {
  //       featurecla: 'Admin-0 country',
  //       scalerank: 1,
  //       LABELRANK: 2,
  //       SOVEREIGNT: 'Italy',
  //       SOV_A3: 'ITA',
  //       ADM0_DIF: 0,
  //       LEVEL: 2,
  //       TYPE: 'Sovereign country',
  //       TLC: '1',
  //       ADMIN: 'Italy',
  //       ADM0_A3: 'ITA',
  //       GEOU_DIF: 0,
  //       GEOUNIT: 'Italy',
  //       GU_A3: 'ITA',
  //       SU_DIF: 0,
  //       SUBUNIT: 'Italy',
  //       SU_A3: 'ITA',
  //       BRK_DIFF: 0,
  //       NAME: 'Italy',
  //       NAME_LONG: 'Italy',
  //       BRK_A3: 'ITA',
  //       BRK_NAME: 'Italy',
  //       BRK_GROUP: null,
  //       ABBREV: 'Italy',
  //       POSTAL: 'I',
  //       FORMAL_EN: 'Italian Republic',
  //       FORMAL_FR: null,
  //       NAME_CIAWF: 'Italy',
  //       NOTE_ADM0: null,
  //       NOTE_BRK: null,
  //       NAME_SORT: 'Italy',
  //       NAME_ALT: null,
  //       MAPCOLOR7: 6,
  //       MAPCOLOR8: 7,
  //       MAPCOLOR9: 8,
  //       MAPCOLOR13: 7,
  //       POP_EST: 60_297_396,
  //       POP_RANK: 16,
  //       POP_YEAR: 2019,
  //       GDP_MD: 2_003_576,
  //       GDP_YEAR: 2019,
  //       ECONOMY: '1. Developed region: G7',
  //       INCOME_GRP: '1. High income: OECD',
  //       FIPS_10: 'IT',
  //       ISO_A2: 'IT',
  //       ISO_A2_EH: 'IT',
  //       ISO_A3: 'ITA',
  //       ISO_A3_EH: 'ITA',
  //       ISO_N3: '380',
  //       ISO_N3_EH: '380',
  //       UN_A3: '380',
  //       WB_A2: 'IT',
  //       WB_A3: 'ITA',
  //       WOE_ID: 23_424_853,
  //       WOE_ID_EH: 23_424_853,
  //       WOE_NOTE: 'Exact WOE match as country',
  //       ADM0_ISO: 'ITA',
  //       ADM0_DIFF: null,
  //       ADM0_TLC: 'ITA',
  //       ADM0_A3_US: 'ITA',
  //       ADM0_A3_FR: 'ITA',
  //       ADM0_A3_RU: 'ITA',
  //       ADM0_A3_ES: 'ITA',
  //       ADM0_A3_CN: 'ITA',
  //       ADM0_A3_TW: 'ITA',
  //       ADM0_A3_IN: 'ITA',
  //       ADM0_A3_NP: 'ITA',
  //       ADM0_A3_PK: 'ITA',
  //       ADM0_A3_DE: 'ITA',
  //       ADM0_A3_GB: 'ITA',
  //       ADM0_A3_BR: 'ITA',
  //       ADM0_A3_IL: 'ITA',
  //       ADM0_A3_PS: 'ITA',
  //       ADM0_A3_SA: 'ITA',
  //       ADM0_A3_EG: 'ITA',
  //       ADM0_A3_MA: 'ITA',
  //       ADM0_A3_PT: 'ITA',
  //       ADM0_A3_AR: 'ITA',
  //       ADM0_A3_JP: 'ITA',
  //       ADM0_A3_KO: 'ITA',
  //       ADM0_A3_VN: 'ITA',
  //       ADM0_A3_TR: 'ITA',
  //       ADM0_A3_ID: 'ITA',
  //       ADM0_A3_PL: 'ITA',
  //       ADM0_A3_GR: 'ITA',
  //       ADM0_A3_IT: 'ITA',
  //       ADM0_A3_NL: 'ITA',
  //       ADM0_A3_SE: 'ITA',
  //       ADM0_A3_BD: 'ITA',
  //       ADM0_A3_UA: 'ITA',
  //       ADM0_A3_UN: -99,
  //       ADM0_A3_WB: -99,
  //       CONTINENT: 'Europe',
  //       REGION_UN: 'Europe',
  //       SUBREGION: 'Southern Europe',
  //       REGION_WB: 'Europe & Central Asia',
  //       NAME_LEN: 5,
  //       LONG_LEN: 5,
  //       ABBREV_LEN: 5,
  //       TINY: -99,
  //       HOMEPART: 1,
  //       MIN_ZOOM: 0,
  //       MIN_LABEL: 2,
  //       MAX_LABEL: 7,
  //       LABEL_X: 11.076_907,
  //       LABEL_Y: 44.732_482,
  //       NE_ID: 1_159_320_919,
  //       WIKIDATAID: 'Q38',
  //       NAME_AR: 'إيطاليا',
  //       NAME_BN: 'ইতালি',
  //       NAME_DE: 'Italien',
  //       NAME_EN: 'Italy',
  //       NAME_ES: 'Italia',
  //       NAME_FA: 'ایتالیا',
  //       NAME_FR: 'Italie',
  //       NAME_EL: 'Ιταλία',
  //       NAME_HE: 'איטליה',
  //       NAME_HI: 'इटली',
  //       NAME_HU: 'Olaszország',
  //       NAME_ID: 'Italia',
  //       NAME_IT: 'Italia',
  //       NAME_JA: 'イタリア',
  //       NAME_KO: '이탈리아',
  //       NAME_NL: 'Italië',
  //       NAME_PL: 'Włochy',
  //       NAME_PT: 'Itália',
  //       NAME_RU: 'Италия',
  //       NAME_SV: 'Italien',
  //       NAME_TR: 'İtalya',
  //       NAME_UK: 'Італія',
  //       NAME_UR: 'اطالیہ',
  //       NAME_VI: 'Ý',
  //       NAME_ZH: '意大利',
  //       NAME_ZHT: '義大利',
  //       FCLASS_ISO: 'Admin-0 country',
  //       TLC_DIFF: null,
  //       FCLASS_TLC: 'Admin-0 country',
  //       FCLASS_US: null,
  //       FCLASS_FR: null,
  //       FCLASS_RU: null,
  //       FCLASS_ES: null,
  //       FCLASS_CN: null,
  //       FCLASS_TW: null,
  //       FCLASS_IN: null,
  //       FCLASS_NP: null,
  //       FCLASS_PK: null,
  //       FCLASS_DE: null,
  //       FCLASS_GB: null,
  //       FCLASS_BR: null,
  //       FCLASS_IL: null,
  //       FCLASS_PS: null,
  //       FCLASS_SA: null,
  //       FCLASS_EG: null,
  //       FCLASS_MA: null,
  //       FCLASS_PT: null,
  //       FCLASS_AR: null,
  //       FCLASS_JP: null,
  //       FCLASS_KO: null,
  //       FCLASS_VN: null,
  //       FCLASS_TR: null,
  //       FCLASS_ID: null,
  //       FCLASS_PL: null,
  //       FCLASS_GR: null,
  //       FCLASS_IT: null,
  //       FCLASS_NL: null,
  //       FCLASS_SE: null,
  //       FCLASS_BD: null,
  //       FCLASS_UA: null,
  //     },
  //     geometry: {
  //       type: 'MultiPolygon',
  //       coordinates: [
  //         [
  //           [
  //             [10.445_536_705_248_117, 46.896_241_825_040_59],
  //             [11.044_870_778_500_07, 46.755_282_642_059],
  //             [11.159_029_649_595_68, 46.937_700_408_270_445],
  //             [12.157_919_771_682_23, 47.111_826_457_835_92],
  //             [12.371_967_654_986_52, 46.763_574_358_705],
  //             [13.813_223_402_568_553, 46.506_531_142_679_76],
  //             [13.699_064_531_472_942, 46.017_319_860_567_284],
  //             [13.941_652_132_551_127, 45.594_442_311_622_57],
  //             [13.142_540_034_881_847, 45.735_401_494_604_13],
  //             [12.329_158_078_325_662, 45.378_857_678_827_22],
  //             [12.386_237_513_873_454, 44.881_354_680_068_77],
  //             [12.257_808_783_890_908, 44.599_436_314_105_62],
  //             [12.586_015_538_290_78, 44.093_641_598_701_17],
  //             [13.527_826_224_829_54, 43.587_846_883_296_72],
  //             [14.027_271_285_872_814, 42.758_675_218_699_27],
  //             [15.140_320_279_055_004, 41.954_378_704_039_726],
  //             [15.925_162_517_837_293, 41.962_670_420_685_7],
  //             [16.167_750_118_915_478, 41.738_794_071_244_37],
  //             [15.882_352_941_176_464, 41.539_792_871_740_985],
  //             [16.781_354_051_054_365, 41.183_249_055_964_1],
  //             [17.523_386_713_175_825, 40.876_455_540_063_034],
  //             [18.379_578_246_392_867, 40.354_077_391_366_616],
  //             [18.479_467_258_601_545, 40.171_659_625_155_17],
  //             [18.293_959_093_071_18, 39.806_824_092_732_31],
  //             [17.737_434_596_480_085, 40.279_451_941_552_85],
  //             [16.866_973_204_376_08, 40.445_286_274_472_35],
  //             [16.453_147_296_654_492, 39.798_532_376_086_314],
  //             [17.166_640_241_002_057, 39.425_405_127_017_456],
  //             [17.052_481_369_906_445, 38.903_026_978_321_066],
  //             [16.638_655_462_184_857, 38.844_984_961_799_24],
  //             [16.096_400_824_480_725, 37.982_646_430_617_89],
  //             [15.682_574_916_759_137, 37.908_020_980_804_125],
  //             [15.682_574_916_759_137, 38.214_814_496_705_17],
  //             [15.896_622_800_063_398, 38.753_776_078_693_534],
  //             [16.110_670_683_367_66, 38.961_068_994_842_89],
  //             [15.725_384_493_419_995, 39.541_489_160_061_104],
  //             [15.411_447_597_907_056, 40.047_283_875_465_55],
  //             [14.997_621_690_185_497, 40.171_659_625_155_17],
  //             [14.697_954_653_559_52, 40.602_828_890_745_855],
  //             [14.055_811_003_646_738, 40.785_246_656_957_3],
  //             [13.627_715_237_038_188, 41.191_540_772_610_07],
  //             [12.885_682_574_916_729, 41.249_582_789_131_89],
  //             [12.100_840_336_134_44, 41.705_627_204_660_49],
  //             [11.187_569_367_369_576, 42.352_381_103_046_5],
  //             [10.516_885_999_682_87, 42.932_801_268_264_71],
  //             [10.202_949_104_169_96, 43.919_515_549_135_696],
  //             [9.703_504_043_126_657, 44.035_599_582_179_344],
  //             [8.890_122_086_570_472, 44.367_268_248_018_32],
  //             [8.433_486_602_188_026, 44.234_600_781_682_73],
  //             [7.848_422_387_823_035, 43.770_264_649_508_164],
  //             [7.434_596_480_101_447_5, 43.695_639_199_694_4],
  //             [7.548_755_351_197_059, 44.126_808_465_285_05],
  //             [7.006_500_713_492_926, 44.251_184_214_974_67],
  //             [6.749_643_253_527_807_5, 45.030_605_579_696_3],
  //             [7.092_119_866_814_642, 45.329_107_378_951_39],
  //             [6.806_722_689_075_627, 45.710_526_344_666_22],
  //             [6.849_532_265_736_457, 45.992_444_710_629_34],
  //             [7.277_628_032_345_007, 45.776_860_077_834_016],
  //             [7.762_803_234_501_32, 45.826_610_377_709_87],
  //             [8.319_327_731_092_415, 46.166_570_760_194_816],
  //             [8.490_566_037_735_846, 46.009_028_143_921_31],
  //             [8.961_471_381_005_225, 46.033_903_293_859_225],
  //             [9.189_789_123_196_42, 46.440_197_409_511_97],
  //             [9.917_551_926_430_946, 46.315_821_659_822_35],
  //             [10.359_917_551_926_4, 46.481_655_992_741_85],
  //             [10.445_536_705_248_117, 46.896_241_825_040_59],
  //           ],
  //         ],
  //         [
  //           [
  //             [14.755_034_089_107_312, 38.140_189_046_891_41],
  //             [15.525_606_469_002_668, 38.231_397_929_997_115],
  //             [15.154_590_137_941_938, 37.443_684_848_629_545],
  //             [15.311_558_585_698_407, 37.136_891_332_728_48],
  //             [15.097_510_702_394_146, 36.622_804_900_678_06],
  //             [14.341_208_181_385_753, 36.995_932_149_746_906],
  //             [13.827_493_261_455_515, 37.103_724_466_144_584],
  //             [12.429_047_090_534_311, 37.609_519_181_549_03],
  //             [12.571_745_679_403_818, 38.123_605_613_599_466],
  //             [13.741_874_108_133_8, 38.032_396_730_493_73],
  //             [14.755_034_089_107_312, 38.140_189_046_891_41],
  //           ],
  //         ],
  //         [
  //           [
  //             [8.704_613_921_040_107, 40.901_330_690_000_95],
  //             [9.204_058_982_083_382, 41.208_124_205_902_01],
  //             [9.803_393_055_335_334, 40.503_328_290_994_176],
  //             [9.674_964_325_352_76, 39.176_653_627_638_245],
  //             [9.218_328_840_970_344, 39.242_987_360_806_04],
  //             [8.804_502_933_248_756, 38.903_026_978_321_066],
  //             [8.433_486_602_188_026, 39.168_361_910_992_246],
  //             [8.390_677_025_527_168, 40.378_952_541_304_56],
  //             [8.162_359_283_335_945, 40.951_080_989_876_8],
  //             [8.704_613_921_040_107, 40.901_330_690_000_95],
  //           ],
  //         ],
  //       ],
  //     },
  //     rsmKey: 'geo-141',
  //     svgPath:
  //       'M663.5176785224679,202.04417490102998L664.8934362190635,202.45350216125993L665.1162248035874,201.92390633434238L667.3284788486102,201.4193851373674L667.8827716691721,202.42940640149146L671.1909013376156,203.17739887152456L671.0455470787341,204.6068000361777L671.6933884635893,205.84844202372986L669.8460385970031,205.4339421040613L668.0716807670958,206.48357309993398L668.3028664095376,207.95470492998757L668.0657493449428,208.7916844959943L668.9202297963312,210.29929787213442L671.1939549701764,211.81448123523978L672.5295078203602,214.3144572501547L675.3000053739246,216.7580876677455L677.1278472560432,216.73280346632257L677.7490938585024,217.41614348048802L677.1311386833413,218.02471401792013L679.3239862694844,219.11777109055873L681.1440591011217,220.06105906377888L683.2981628586041,221.67297918074968L683.5835784060802,222.23756956656894L683.2446480156423,223.36935678121372L681.8051123302694,221.90384243261394L679.7118712543679,221.39101201931334L678.8952042067721,223.39511936767886L680.675712627529,224.55626792941058L680.5343513985274,226.18783996194298L679.5645788369126,226.369550850417L678.4728950277553,229.07911512072292L677.5002733266147,229.3144558754721L677.4323073126257,228.34781313559913L677.8209626357109,226.65526706374186L678.2821509209007,226.00621366790534L677.2340532995399,224.19463866763132L676.3760849981032,222.6230169683168L675.3716918183708,222.23756956656894L674.5704858698774,220.9044952924539L673.0216534952175,220.34198275743526L671.9323057158726,219.09231200156836L670.1822321615304,218.91415042831906L668.259671241956,217.51749647404515L666.0151438681652,215.54660197593816L664.360099047567,213.78782631581103L663.4729617305852,210.82006990498942L662.3058394177755,210.47278910402156L660.3885072886372,209.482756302449L659.3593532901973,209.87837738823225L658.0748937377596,211.26715634448237L657.130724024783,211.49094446807788L657.3415472781426,210.20020476988188L656.08178261191,209.82889610320154L655.4066122722542,207.51257225597547L656.1535349387837,206.6303453322215L655.4605327009374,205.50704429151367L655.5256183547659,204.67968311655738L656.5221076841412,205.31214792568062L657.617157343613,205.16606561646213L658.8329373750105,204.16990997125671L659.2429470071232,204.63109223883234L660.3064797932284,204.55822210601826L660.7612367119073,203.37077159608117L662.4261076003825,203.73372236045057L663.397517204897,203.24989722837344ZM675.2339831922054,228.5827306454831L677.0539925272191,228.29562780103365L676.336239788102,230.7818267157926L676.7777355351492,231.75417582149132L676.3701312847624,233.3885052015699L674.4748687286364,232.20167986251536L673.219403815223,231.85942862041094L669.7724472534704,230.2571691425433L670.0233941408798,228.6349530712032L672.8355657291422,228.92229664728202ZM660.4347470861793,219.98448211250886L661.56452969675,219.04139939789872L663.0727689348139,221.2116926361351L662.9594650571743,225.33234501844896L661.866958644228,225.12523732507807L660.9286149061853,226.18783996194298L660.0143529296082,225.35824132324322L659.7634434774906,221.59605730985442L659.1556389117704,219.831377927777Z',
  //   },
  //   dxEvents: [
  //     [
  //       'Marco',
  //       '27/06/2023',
  //       '2023-06-27',
  //       'Italy',
  //       'Oracolo del test',
  //       'Exploring Node.js test runner\r',
  //     ],
  //     [
  //       'Marco',
  //       '30/06/2023',
  //       '2023-06-30',
  //       'Italy',
  //       'Working Software Conf',
  //       'OWASP top 10 vulnerabilities in Node.js\r',
  //     ],
  //     [
  //       'Marco',
  //       '07/09/2023',
  //       '2023-09-07',
  //       'Italy',
  //       'Schrödinger Hat',
  //       'Measuring the cost of a GraphQL Query\r',
  //     ],
  //     [
  //       'Marco',
  //       '23/09/2023',
  //       '2023-09-23',
  //       'Italy',
  //       'Come to Code',
  //       'Measuring the cost of a GraphQL Query\r',
  //     ],
  //     [
  //       'Marco',
  //       '19/11/2023',
  //       '2023-11-19',
  //       'Italy',
  //       'Pescara DevFest',
  //       'Measuring the cost of a GraphQL Query\r',
  //     ],
  //     [
  //       'Marco',
  //       '19/11/2023',
  //       '2023-11-19',
  //       'Italy',
  //       'Pescara DevFest',
  //       'Your First Node.js Contribution\r',
  //     ],
  //     [
  //       'Marco',
  //       '25/11/2023',
  //       '2023-11-25',
  //       'Italy',
  //       'Milano Cloud DevFest',
  //       '"Developers in Danger: How supply chain attacks target devs',
  //       ' not production"\r',
  //     ],
  //     [
  //       'Marco',
  //       '02/12/2023',
  //       '2023-12-02',
  //       'Italy',
  //       'Devfest Alps 2023',
  //       'Exploring Node.js test runner\r',
  //     ],
  //     [
  //       'Rafael',
  //       '24/03/2023',
  //       '2023-03-24',
  //       'Italy',
  //       'OSDay Florence',
  //       '5 Ways you could have hacked Node.js\r',
  //     ],
  //     [
  //       'Paolo',
  //       '14/01/2023',
  //       '2023-01-14',
  //       'Italy',
  //       'DevFest Alps 2023',
  //       'The tale of avoiding a time-based DDOS attack in Node.js\r',
  //     ],
  //     [
  //       'Paolo',
  //       '16/03/2023',
  //       '2023-03-16',
  //       'Italy',
  //       'Milan WebDay 2023',
  //       'The last 5 years of streams in Node.js\r',
  //     ],
  //     [
  //       'Paolo',
  //       '23/09/2023',
  //       '2023-09-23',
  //       'Italy',
  //       'Come To Code 2023',
  //       'Do not break GraphQL extend it!\r',
  //     ],
  //     [
  //       'Paolo',
  //       '30/09/2023',
  //       '2023-09-30',
  //       'Italy',
  //       'NodeConf ITA 2023',
  //       'The tale of avoiding a time-based DDOS attack in Node.js\r',
  //     ],
  //     [
  //       'Paolo',
  //       '27/10/2023',
  //       '2023-10-27',
  //       'Italy',
  //       'React.js Day 2023',
  //       'Do not break GraphQL extend it!\r',
  //     ],
  //     [
  //       'Paolo',
  //       '18/11/2023',
  //       '2023-11-18',
  //       'Italy',
  //       'DevFest Pescara 2023',
  //       'From Smart Home to Smart Cats: extending my home automation to my pets\r',
  //     ],
  //     [
  //       'Paolo',
  //       '02/12/2023',
  //       '2023-12-02',
  //       'Italy',
  //       'DevFest Bari 2023',
  //       'The bees are important: use SDKs wisely\r',
  //     ],
  //     [
  //       'Cody',
  //       '14/01/2023',
  //       '2023-01-14',
  //       'Italy',
  //       'DevFest Alps',
  //       'Zen and the Art of Organizational Open Source\r',
  //     ],
  //   ],
};

function eventCountToColor(count: number) {
  if (count === 0) {
    return 'fill-white';
  }

  if (count === 1) {
    return 'fill-nfBlue-10';
  }

  if (count === 2) {
    return 'fill-nfBlue-30';
  }

  if (count === 3) {
    return 'fill-nfBlue-50';
  }

  if (count === 4) {
    return 'fill-nfBlue-80';
  }

  return 'fill-nfBlue-100';
}

type SelectedCountry = {
  geo: any | undefined;
  dxEvents: DxEvent[];
};

function App() {
  const [count, setCount] = useState(0);
  const [hoverCountry, setHoverCountry] = useState<SelectedCountry>();
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>();

  const country = hoverCountry ?? selectedCountry ?? defaultCountry;

  // Console.log(country.dxEvents, country.geo?.properties?.NAME);

  return (
    <div className="w-100dvw h-100dvh items-center max-w-100dvw max-h-100dvh overflow-hidden">
      {/* <div className="flex-grow-0 flex-shrink-0 text-sm">
        {country.dxEvents.length > 0 ? (
          country.geo.properties.NAME
        ) : (
          <>&nbsp;</>
        )}
      </div> */}
      <EventHorizontalList
        dxEvents={country.dxEvents}
        countryName={country.geo?.properties?.NAME}
      />
      {/* <div className="flex-grow-0 flex-shrink-0 flex-row text-sm">
        {country.dxEvents.length === 0 ? (
          <div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
          </div>
        ) : (
          country.dxEvents.map((dxEvent) => (
            <div
              key={`${dxEvent[eventNameIndex]}${dxEvent[eventPersonIndex]}${dxEvent[eventTitleIndex]}`}
            >
              <div>{dxEvent[eventNameIndex]}</div>
              <div>{dxEvent[eventPersonIndex]}</div>
            </div>
          ))
        )}
      </div> */}
      <div className="flex-grow-1 flex-shrink-1 w-auto aspect-video">
        <div className="h-full aspect-video">
          <ComposableMap
            // ClassName="w-full aspect-square max-h-full"
            className="w-full h-full"
            width={1280}
            height={720}
          >
            <ZoomableGroup>
              <Geographies geography={geo}>
                {({geographies}) =>
                  geographies.map((geo) => {
                    // Console.log(geo);
                    const dxEvents = eventList.filter(
                      (event) =>
                        event[eventCountryIndex] === geo.properties.NAME,
                    );
                    // If (dxEvents.length === 0) {
                    //   console.log(geo.properties.NAME);
                    // }

                    if (geo.properties.NAME.toLowerCase() === 'italy') {
                      console.log(dxEvents);
                      console.log(geo);
                    }

                    const isSelected =
                      selectedCountry && selectedCountry.geo === geo;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        className={clsx(
                          'hover:fill-nfGreen-80 pressed:red-8 stroke-nfGreen-100 focus:outline-none active:border-none',
                          isSelected
                            ? 'fill-nfGreen-80'
                            : eventCountToColor(dxEvents.length),
                          // ColorWeight === 0
                          //   ? 'fill-gray-700'
                          //   : `fill-red-${colorWeight}`,
                        )}
                        // Hover="abc"
                        // Style={{
                        //   default: {
                        //     fill: dxEvents.length > 0 ? '#0F0' : '#EEE',
                        //     stroke: '#000',
                        //   },
                        //   hover: {
                        //     fill: '#F53',
                        //   },
                        //   pressed: {
                        //     fill: '#E42',
                        //   },
                        // }}
                        onMouseEnter={() => {
                          setHoverCountry({geo, dxEvents});
                        }}
                        onMouseLeave={() => {
                          setHoverCountry(undefined);
                        }}
                        onClick={() => {
                          console.log('click');
                          setSelectedCountry({geo, dxEvents});
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>

          {/* <div className="h-full max-w-0 aspect-video">
            <div className="w-full">hello</div>
          </div> */}
        </div>
        {/* <div className="w-full max-w-[calc(100vh_*_(16/9))] max-h-full aspect-video"> */}
        {/* <div className="h-full aspect-video">
          <ComposableMap
            // ClassName="w-full aspect-square max-h-full"
            className="w-full h-full"
            width={1280}
            height={720}
          >
            <ZoomableGroup>
              <Geographies geography={geo}>
                {({geographies}) =>
                  geographies.map((geo) => {
                    // Console.log(geo);
                    const dxEvents = eventList.filter(
                      (event) => event[eventCountry] === geo.properties.NAME,
                    );
                    // If (dxEvents.length === 0) {
                    //   console.log(geo.properties.NAME);
                    // }
                    if (geo.properties.NAME === 'Italy') {
                      console.log(geo);
                    }

                    const colorWeight = Math.min(dxEvents.length, 9) * 100;
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        className={clsx(
                          'hover:fill-red pressed:red-8 stroke-white focus:outline-none active:border-none',
                          colorWeight === 0
                            ? 'fill-gray-700'
                            : `fill-red-${colorWeight}`,
                        )}
                        // Hover="abc"
                        // Style={{
                        //   default: {
                        //     fill: dxEvents.length > 0 ? '#0F0' : '#EEE',
                        //     stroke: '#000',
                        //   },
                        //   hover: {
                        //     fill: '#F53',
                        //   },
                        //   pressed: {
                        //     fill: '#E42',
                        //   },
                        // }}
                        onMouseEnter={() => {
                          setCountry({geo, dxEvents});
                        }}
                        onMouseLeave={() => {
                          setCountry(defaultCountry);
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div> */}
      </div>
    </div>
  );
}

export default App;
