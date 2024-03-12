import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
// import { media_mock } from "@/app/data/projects";
import { StaticImageData } from "next/image";

import { API_KEY } from "@/app/configs/API_KEY";
import { Projectinterface } from "@/app/interfaces/ProjectInterface";
import axios from "axios";

const allProjects = [
  {
    project_id: 1,
    name_ru: "Молочная ферма",
    name_tj: "Фермаи ширӣ",
    name_en: "Dairy farm",
    name_de: "Milchbauernhof",
    short_ru: `Поскольку регион находится в высокогорье, зимы очень холодные, а производство молока также снижается из-за неправильного строительства зданий молочной фермы. Та же проблема касается и сохранения овощных и плодовых культур в зимний период. Реконструированы четыре молочно-товарные фермы и шесть приусадебных плодоовощехранилищ с применением термоизоляционных технологий. Практикум проводил местный тренер для групп производителей в Рошткалинском и Рушанском районах. Эта технология была адаптирована с использованием местных строительных материалов, чтобы помочь фермерам воспроизвести эту технологию в будущем. Во время тренинга среди членов группы в районе было распространено практическое пособие. Техническая поддержка по мере необходимости, направленная на длительное хранение и продление сроков годности различных выращиваемых культур и внедрение новой адаптированной технологии. Кроме того, это положительно скажется на производственных мощностях групп производителей молока.`,
    short_tj: `Азбаски ноҳия дар кӯҳсори баланд воқеъ аст, зимистон хеле хунук буда, истеҳсоли шир низ аз сабаби нодуруст сохта шудани биноҳои фермаи ширӣ  кам мешавад. Айнан ҳамин масъала ба нигоҳ доштани зироатҳои сабзавоту мева дар давраи зимистон дахл дорад. Чор фермаи ширӣ ва шаш анбори меваю сабзавоти хонагӣ бо технологиям термоизолятсионӣ аз нав сохта шуд. Тренинги амалӣ аз ҷониби тренери маҳаллӣ барои гурӯҳҳои истеҳсолӣ дар ноҳияҳои Роштқалъа ва Рӯшон гузаронида шуд. Ин технология бо истифода аз масолеҳи сохтмонии маҳаллӣ мутобиқ карда шудааст, то ба деҳқонон дар оянда технологияро такрор кунанд. Дар рафти машгулият дар байни аъзоёни гурух дар район дастури амалӣ пахн карда шуд. Дастгирии техникӣ дар асоси эҳтиёҷот ба нигоҳдории дарозмуддат ва дароз кардани мӯҳлати нигоҳдории зироатҳои гуногун ва ҷорӣ намудани технологияи нави мутобиқшуда нигаронида шудааст. Илова бар ин, он ба иқтидори истеҳсолии гурӯҳҳои истеҳсолкунандагони шир таъсири мусбат мерасонад.`,
    short_en: `Since the region is in high mountains the winters are very cold and the milk production also decreases due to improper construction of the dairy farm buildings. The same problem applies to preservation of vegetable and fruit crops in the winter period. Four dairy farms and six home-based fruits and vegetable storages have been re-constructed using thermos-insulation technology. The practical trainings were conducted by the local trainer for producer groups in Roshtqala and Rushan Districts. This technology has been adapted in using locally available construction materials to help the farmers to replicate the technology in the future. During the training a practical handbook was disseminated among the group members in the district. The need-based technical support aimed at long-term storage and shelf-life extension of diverse produced crops and introduction of new adapted technology. Furthermore, it will positively impact on production capacity of milk producer groups.`,
    short_de: `Da die Region im Hochgebirge liegt, sind die Winter sehr kalt und auch die Milchproduktion geht aufgrund unsachgemäßer Bauweise der Milchwirtschaftsgebäude zurück. Das gleiche Problem gilt für die Erhaltung von Gemüse- und Obstkulturen im Winter. Vier Milchviehbetriebe und sechs Obst- und Gemüselager zu Hause wurden mithilfe der Thermoisolationstechnologie umgebaut. Die praktische Schulung wurde vom örtlichen Trainer für Produzentengruppen in den Distrikten Roshtqala und Rushan durchgeführt. Diese Technologie wurde unter Verwendung lokal verfügbarer Baumaterialien angepasst, um den Landwirten zu helfen, die Technologie in Zukunft zu reproduzieren. Während der Schulung wurde ein praktisches Handbuch unter den Gruppenmitgliedern im Bezirk verteilt. Die bedarfsgerechte technische Unterstützung zielt auf die langfristige Lagerung und Verlängerung der Haltbarkeit verschiedener angebauter Nutzpflanzen sowie auf die Einführung neuer angepasster Technologien ab. Darüber hinaus wird es sich positiv auf die Produktionskapazität der Milcherzeugergemeinschaften auswirken.`,
    category_id: 1,
    banner_url: "dairy",
    implementation: "",
    location: [37.840312, 71.654453],
    district_id: 4,
    village_id: 2,
    giz_programme_id: 1,
    adress_ru: "",
    adress_tj: "",
    adress_en: "",
    adress_de: "",
    created_at: "",
  },
  {
    project_id: 2,
    name_ru: "Экспериментальная теплица",
    name_tj: "Гармхонаи таҷрибавӣ",
    name_en: "Demo-Greenhouse",
    name_de: "Demo-Gewächshaus",
    short_ru: `Демо-теплица была построена для внедрения устойчивого и инновационного управления растениеводством для групп производителей овощей в Дерзуде Рушанского района. Был нанят местный специалист по теплицам не только для демонстрации процесса строительства, но и для обучения инновационным технологиям выращивания, посадки и орошения. В вегетационный период внедрена технология капельного орошения и совместно размещена в теплице. Теплица дала хорошие результаты, дав за май-октябрь 3,5 тонны огурцов с 200-метрового участка.`,
    short_tj: `Гармхонаи намоишӣ бо мақсади ҷорӣ намудани идоракунии устувор ва инноватсионии зироат барои гурӯҳҳои истеҳсолкунандаи сабзавот дар Дерзуди ноҳияи Рӯшон сохта шудааст. Мутахассиси гармхонаҳои маҳаллӣ на танҳо барои намоиши раванди сохтмон, балки барои омӯзиши инноватсионии парвариш, ниҳолшинонӣ ва технологияи обёрӣ низ ҷалб карда шуд. Дар давраи вегетатсия технологияи обёрии қатрагӣ ҷорӣ карда шуда, якҷоя дар гармхона ҷойгир карда шуд. Гармхона дар давоми моҳҳои май то октябрь аз 200-метра 3,5 тонна бодиринг дод, натиҷаҳои хуб дод.`,
    short_en: `The Demo-Greenhouse was constructed to introduce sustainable and innovative crop management for vegetable producer groups in Derzud, in the Rushan district. A local greenhouse expert was hired not only for the demonstration of the construction process, but also to teach innovative cultivation, planting, and irrigation technologies. In the vegetation period drip irrigation technology was introduced and jointly placed in the greenhouse. The greenhouse has brought good results in giving 3.5 tons of cucumbers from 200 m plot during May to October.`,
    short_de: `Demo-Gewächshaus wurde gebaut, um Gemüseproduzentengruppen in Derzud im Bezirk Rushan ein nachhaltiges und innovatives Pflanzenmanagement vorzustellen. Ein lokaler Gewächshausexperte wurde nicht nur für die Demonstration des Bauprozesses engagiert, sondern auch für die Vermittlung innovativer Anbau-, Pflanz- und Bewässerungstechnologien. In der Vegetationsperiode wurde die Tropfbewässerungstechnik eingeführt und gemeinsam im Gewächshaus platziert. Das Gewächshaus hat gute Ergebnisse gebracht und von Mai bis Oktober 3,5 Tonnen Gurken auf einer 200 m² großen Parzelle geerntet.`,
    category_id: 1,
    banner_url: "vegetable",
    implementation: "",
    location: [37.95615553310948, 71.50643592187403],
    district_id: 4,
    village_id: 2,
    giz_programme_id: 1,
    adress_ru: "",
    adress_tj: "",
    adress_en: "",
    adress_de: "",
    created_at: "",
  },
  {
    project_id: 3,
    name_ru: "Центр Предпринимательства, Хорог",
    name_tj: "Маркази соҳибкорӣ, Хоруғ",
    name_en: "Khorog Centre for Entrepreneurship",
    name_de: "Khorog-Zentrum für Unternehmertum",
    short_ru: `Хорогский центр предпринимательства (ХПП) был создан в сотрудничестве со Школой профессионального и непрерывного образования (ШПНО) Университета Центральной Азии (УЦА) в 2021 году с целью предоставления консультаций, обучения и поддержки для получения дохода и содействия развитию рынка. для руководителей малого бизнеса и фермеров региона. KCE предлагает ориентированные на практику и пост-инвестиционные консультации для ММСП, включая мелких фермеров.
  Темы в основном сосредоточены на управлении бизнесом, финансовой грамотности, расчете затрат, переработке сельскохозяйственной продукции и послеуборочному управлению, изменении климата, цепочке создания стоимости, маркетинге и брендинге и т. д. После теоретического обучения следует практическая деятельность в области, связанной с целевой группы в процессе, чтобы понять и определить проблемы и разработать решения, адаптированные к контексту.
  `,
    short_tj: `Маркази соҳибкории Хоруғ дар ҳамкорӣ бо Мактаби таҳсилоти касбӣ ва давомдори Донишгоҳи Осиёи Марказӣ (ДОМ) дар соли 2021 бо мақсади пешниҳоди машваратҳо, омӯзишҳо ва дастгирӣ барои дарёфти даромад ва мусоидат ба рушди бозор таъсис дода шудааст. Барои роҳбарони корхонаҳои хурд ва деҳконони вилоят. KCE машваратҳои ба амалия нигаронидашуда ва пас аз сармоягузорӣ барои КХМ, аз ҷумла фермерҳои хурд пешниҳод мекунад.
  Мавзӯъҳо асосан ба идоракунии соҳибкорӣ, саводнокии молиявӣ, ҳисобкунии хароҷот, коркарди маҳсулоти кишоварзӣ ва идоракунии пас аз ҳосилғундорӣ, тағирёбии иқлим, занҷири арзиш, маркетинг ва брендинг ва ғайра нигаронида шудаанд. Омӯзиши назариявӣ бо фаъолиятҳои амалӣ дар соҳа бо ҷалби ҳадафҳои мақсаднок гузаронида мешавад. гурӯҳҳо дар ин раванд барои фаҳмидан ва муайян кардани мушкилот ва таҳияи ҳалли мувофиқи контекст.
  `,
    short_en: ` The Khorog Centre for Entrepreneurship (KCE) was established in collaboration with the University of Central Asia’s (UCA) School of Professional and Continuing Education (SPCE) in 2021 with the aim to provide advice, trainings, and support to generate income and promote market development for small business leaders and farmers in the region. The KCE offers practice-oriented and post-investment consultations for MSMEs including small-scale farmers.
  The topics mainly focus on business management, financial literacy, cost calculation, agricultural product processing and post-harvest management, climate change, value chain, marketing, and branding, etc. The theoretical trainings are followed by practical activities in the field involving the target groups in the process to understand and identify the challenges and develop context adapted solutions.`,
    short_de: `Das Khorog Center for Entrepreneurship (KCE) wurde 2021 in Zusammenarbeit mit der School of Professional and Continuing Education (SPCE) der University of Central Asia (UCA) mit dem Ziel gegründet, Beratung, Schulungen und Unterstützung anzubieten, um Einnahmen zu generieren und die Marktentwicklung zu fördern für Kleinunternehmer und Landwirte in der Region. Das KCE bietet praxisorientierte und investitionsnachbereitende Beratungen für KKMU einschließlich Kleinbauern an.
  Die Themen konzentrieren sich hauptsächlich auf Unternehmensführung, Finanzkompetenz, Kostenkalkulation, Verarbeitung landwirtschaftlicher Produkte und Nacherntemanagement, Klimawandel, Wertschöpfungskette, Marketing und Branding usw. Auf die theoretische Ausbildung folgen praktische Aktivitäten vor Ort, an denen die Zielgruppe beteiligt ist Gruppen dabei, die Herausforderungen zu verstehen und zu identifizieren und kontextangepasste Lösungen zu entwickeln.
  `,
    category_id: 1,
    banner_url: "entrepreneurship_center",
    implementation: "",
    location: [37.492002, 71.544383],
    district_id: 1,
    village_id: 2,
    giz_programme_id: 1,
    adress_ru: "",
    adress_tj: "",
    adress_en: "",
    adress_de: "",
    created_at: "",
  },
  {
    project_id: 4,
    name_ru:
      "Департамент стандартизации, метрологии, сертификации и торговой инспекции (Гос стандарт)",
    name_tj:
      "Раёсати стандартизатсия, метрология, сертификатсия ва нозироти савдо (ГОССтандарт)",
    name_en: `Department for Standardization, Metrology, Certification and Trade Inspection (Gos-standard)`,
    name_de:
      "Abteilung für Normung, Messtechnik, Zertifizierung und Handelsinspektion (Gos-Standard)",
    short_ru: `По результатам оценки потребностей Центр диагностики безопасности пищевых продуктов и Управление стандартизации, метрологии, сертификации и торговой инспекции ГБАО были обеспечены современным лабораторным оборудованием. Цель этого проекта заключалась в том, чтобы помочь государственным органам инспектировать как местные, так и импортные продукты, чтобы обеспечить их безопасное использование конечными потребителями и проверить качество.`,
    short_tj: `Дар асоси натиҷаҳои арзёбии эҳтиёҷот Маркази ташхиси бехатарии озуқаворӣ ва Раёсати стандартизатсия, метрология, сертификатсия ва нозироти савдои ВМКБ бо таҷҳизоти муосири лабораторӣ таъмин карда шуданд. Ҳадафи ин лоиҳа кӯмак ба мақомоти давлатӣ дар тафтиши маҳсулоти маҳаллӣ ва воридотӣ барои таъмини бехатарии истифодаи истеъмолкунандагони ниҳоӣ ва санҷиши сифат буд.`,
    short_en: `Based on the need assessment results, Food Safety Diagnostic Centre and the Department for Standardization, Metrology, Certification and Trade Inspection in the GBAO have been supported with modern laboratory equipment. The purpose of this project was to help the state agencies to inspect both local and imported products to ensure safety usage by end consumers and verify the quality.`,
    short_de: `Basierend auf den Ergebnissen der Bedarfsermittlung wurden das Food Safety Diagnostic Center und die Abteilung für Standardisierung, Metrologie, Zertifizierung und Handelskontrolle im GBAO mit moderner Laborausrüstung unterstützt. Der Zweck dieses Projekts bestand darin, den staatlichen Behörden dabei zu helfen, sowohl lokale als auch importierte Produkte zu prüfen, um die sichere Verwendung durch Endverbraucher zu gewährleisten und die Qualität zu überprüfen.`,
    category_id: 1,
    banner_url: "gosstand",
    implementation: "",
    location: [37.4921387, 71.5518919],
    district_id: 1,
    village_id: 2,
    giz_programme_id: 1,
    adress_ru: "",
    adress_tj: "",
    adress_en: "Khorog Bazar",
    adress_de: "",
    created_at: "",
  },
  {
    project_id: 7,
    name_ru: "Пищевая лаборатория(Хорог Базар)",
    name_tj: "Лабораторияи озуқаворӣ (Бозори Хоруғ)",
    name_en: `Food laboratory(Khorog Bazar)`,
    name_de: "Lebensmittellabor (Khorog Bazar)",
    short_ru: `По результатам оценки потребностей Центр диагностики безопасности пищевых продуктов и Управление стандартизации, метрологии, сертификации и торговой инспекции ГБАО были обеспечены современным лабораторным оборудованием. Цель этого проекта заключалась в том, чтобы помочь государственным органам инспектировать как местные, так и импортные продукты, чтобы обеспечить их безопасное использование конечными потребителями и проверить качество.`,
    short_tj: `Дар асоси натиҷаҳои арзёбии эҳтиёҷот Маркази ташхиси бехатарии озуқаворӣ ва Раёсати стандартизатсия, метрология, сертификатсия ва нозироти савдои ВМКБ бо таҷҳизоти муосири лабораторӣ таъмин карда шуданд. Ҳадафи ин лоиҳа кӯмак ба мақомоти давлатӣ дар тафтиши маҳсулоти маҳаллӣ ва воридотӣ барои таъмини бехатарии истифодаи истеъмолкунандагони ниҳоӣ ва санҷиши сифат буд.`,
    short_en: `Based on the need assessment results, Food Safety Diagnostic Centre and the Department for Standardization, Metrology, Certification and Trade Inspection in the GBAO have been supported with modern laboratory equipment. The purpose of this project was to help the state agencies to inspect both local and imported products to ensure safety usage by end consumers and verify the quality.`,
    short_de: `Basierend auf den Ergebnissen der Bedarfsermittlung wurden das Food Safety Diagnostic Center und die Abteilung für Standardisierung, Metrologie, Zertifizierung und Handelskontrolle im GBAO mit moderner Laborausrüstung unterstützt. Der Zweck dieses Projekts bestand darin, den staatlichen Behörden dabei zu helfen, sowohl lokale als auch importierte Produkte zu prüfen, um die sichere Verwendung durch Endverbraucher zu gewährleisten und die Qualität zu überprüfen.`,
    category_id: 1,
    banner_url: "gosstandBazar",
    implementation: "",
    location: [37.4908477, 71.5388424],
    district_id: 1,
    village_id: 2,
    giz_programme_id: 1,
    adress_ru: "",
    adress_tj: "1",
    adress_en: "Khorog Bazar",
    adress_de: "",
    created_at: "",
  },
  {
    project_id: 5,
    name_ru:
      "Учебный центр технического и профессионального образования (ТПОП), УЦА, ШПНО",
    name_tj: "Маркази таълимии таҳсилоти техникӣ ва касбӣ (ТМТ), ДОМ, ММКД",
    name_en: `The Technical and Vocational Education Training Centre (TVET), UCA, SPCE`,
    name_de:
      "Das Technical and Vocational Education Training Center (TVET), UCA, SPCE",
    short_ru: `Учебный центр технического и профессионального образования (ТПО) Школы профессионального и непрерывного образования (ШПНО) Университета Центральной Азии (УЦА) был полностью оснащен необходимыми инструментами и оборудованием для запуска нового цеха и услуг по техническому обслуживанию большегрузных автомобилей. .
  Эта мастерская по обслуживанию автомобилей будет обслуживать тяжелую сельскохозяйственную технику, а также готовить и обучать специалистов, способных начать собственное дело в выбранной сфере.
  `,
    short_tj: `Маркази таълимии техникӣ ва касбии Мактаби таҳсилоти касбӣ ва давомдори (ММД) Донишгоҳи Осиёи Марказӣ (ДОМ) барои ба кор андохтани коргоҳ ва хидматрасонии нави мошинҳои вазнинбор бо асбобу таҷҳизоти зарурӣ муҷаҳҳаз гардидааст.
  Ин коргоҳи таъмири мошинҳо ба мошинҳои вазнини кишоварзӣ хизмат мерасонад ва инчунин мутахассисонро омода ва таълим медиҳад, ки дар соҳаи интихобшуда метавонанд тиҷорати худро оғоз кунанд.
  `,
    short_en: `The Technical and Vocational Education Training Centre (TVET) of the School of Professional and Continuing Education (SPCE), of the University of Central Asia (UCA) has been fully equipped with essential tools and equipment for launching new heavy-truck maintenance workshop and services. 
  This vehicle maintenance workshop will serve agricultural heavy machines as well as prepare and train specialists, who are able to start their own businesses in the chosen field.
  `,
    short_de: `Das Technical and Vocational Education Training Center (TVET) der School of Professional and Continuing Education (SPCE) der University of Central Asia (UCA) wurde vollständig mit wichtigen Werkzeugen und Geräten für den Start neuer Werkstätten und Dienstleistungen für die Wartung schwerer Lkw ausgestattet .
  In dieser Fahrzeugwartungswerkstatt werden schwere landwirtschaftliche Maschinen betreut und Fachkräfte vorbereitet und ausgebildet, die in der Lage sind, in dem gewählten Bereich ihr eigenes Unternehmen zu gründen.
  `,
    category_id: 1,
    banner_url: "TVETCentre",
    implementation: "",
    location: [37.48765096877228, 71.58689867375351],
    district_id: 1,
    village_id: 2,
    giz_programme_id: 1,
    adress_ru: "",
    adress_tj: "",
    adress_en: "Bar-khorog",
    adress_de: "",
    created_at: "",
  },
  {
    project_id: 6,
    name_ru: "Кооператив Зиндаги",
    name_tj: "Кооперативи Зиндагӣ",
    name_en: `Cooperative Zindagi`,
    name_de: "Cooperative Zindagi",
    short_ru: `Кооператив «Зиндаги» был создан при поддержке GIZ в 2010 году с миссией по продвижению энергосберегающих технологий среди местного населения для снижения нагрузки на использование природных ресурсов. В 2020 году кооператив «Зиндаги» получил небольшие субсидии на внедрение новых солнечных сушилок для фруктов на рынке для фермеров.
  Новые модели солнечных сушилок по сравнению с традиционными методами сушки могут улучшить качество сухофруктов по следующим двум характеристикам:
  Плоды сушат в закрытом ящике от пыли.
  Плоды не сушат под прямыми солнечными лучами.
  `,
    short_tj: `Кооперативи «Зиндагӣ» бо дастгирии GIZ соли 2010 бо мақсади пешбурди технологияҳои каммасраф барои аҳолии маҳаллӣ бо мақсади паст кардани фишор ба истифодаи захираҳои табиӣ таъсис дода шудааст. Дар соли 2020 кооперативи «Зиндагӣ» барои ба бозор ворид намудани мевахушккунакҳои нави офтобӣ барои деҳқонон субсидияҳои хурд гирифт.
  Моделҳои нави хушккунакҳои офтобӣ дар муқоиса бо усулҳои анъанавии хушккунӣ метавонанд сифати меваи хушкро бо ду хусусияти зерин беҳтар кунанд:
  Мева дар қуттии пӯшида аз хок хушк карда мешавад.
  Меваҳо дар зери таъсири бевоситаи офтоб хушк намешаванд.
  `,
    short_en: `The cooperative “Zindagi” was established with support of GIZ in 2010 with its mission to promote energy-saving technologies for the local population to reduce pressure on using natural resources. In 2020, cooperative “Zindagi” has got small subsidies for introducing new solar fruit dryers in the market for farmers.
  The new solar dryer models in comparison to traditional drying methods can improve the quality of dried fruit by the following two characteristics:
  Fruits are dried in a closed box out from dust.
  Fruits are not dried under direct sun effects.
  `,
    short_de: `Die Genossenschaft „Zindagi“ wurde 2010 mit Unterstützung der GIZ gegründet und hat sich zum Ziel gesetzt, energiesparende Technologien für die lokale Bevölkerung zu fördern, um den Druck bei der Nutzung natürlicher Ressourcen zu verringern. Im Jahr 2020 erhielt die Genossenschaft „Zindagi“ kleine Zuschüsse für die Einführung neuer Solar-Obsttrockner auf dem Markt für Landwirte.
  Die neuen Modelle von Solartrocknern können im Vergleich zu herkömmlichen Trocknungsmethoden die Qualität von Trockenfrüchten durch die folgenden zwei Eigenschaften verbessern:
  Die Früchte werden in einer geschlossenen Kiste staubfrei getrocknet.
  Früchte werden nicht unter direkter Sonneneinstrahlung getrocknet.
  `,
    category_id: 1,
    banner_url: "zindagi",
    implementation: "",
    location: [37.487182444523796, 71.58788378698672],
    district_id: 1,
    village_id: 2,
    giz_programme_id: 1,
    adress_ru: "",
    adress_tj: "",
    adress_en: "Bar-khorog",
    adress_de: "",
    created_at: "",
  },
  {
    project_id: 8,
    name_ru: "Кооператив Паршед",
    name_tj: "Кооперативи Паршед",
    name_en: `Cooperative Parshed`,
    name_de: "Kooperative Parshed",
    short_ru: `Кооператив «Паршед» работает с 1988 года как первое авторемонтное предприятие в ГБАО. Поскольку в кооперативе работает профессиональный техник, обучавшийся своему ремеслу еще во времена Советского Союза, он привлекает клиентов со всех уголков ГБАО. Кооператив получил субсидии с целью увеличить количество боксов с 2 до 5, чтобы иметь больше мест для автомобилей и обеспечить укрытие для автомобилей, особенно зимой и в сезон дождей.
    Теперь предприятие обслуживает больше клиентов благодаря улучшенным помещениям и созданию дополнительной постоянной работы. Бизнес поддерживает молодых людей в профессиональном обучении.
    Предприятие увеличило доходы на 15% и улучшило условия труда своих специалистов.
  `,
    short_tj: `Кооперативи "Паршед" аз соли 1988 ҳамчун аввалин шӯъбаи хидматрасонии техникии автомобилҳо дар ГБАО кор мекунад. Азбаски дар кооператив як техники касбӣ кор мекунад, ки дар Замони Иттиҳоди Шӯравӣ ҳунари худро омӯхтааст, ӯ муштариенро аз тамоми гӯшаҳои ГБАО ҷалб мекунад.  Кооператив бо мақсади зиед кардани шумораи қуттиҳо аз 2 то 5 субсидия гирифт, то барои мошинҳо ҷойҳои бештар дошта бошад ва барои мошинҳо, хусусан дар фасли зимистон ва мавсими боронӣ паноҳгоҳ таъмин кунад.
    Ҳоло тиҷорат ба туфайли ҷойҳои беҳтаршуда ва эҷоди кори иловагии доимӣ ба мизоҷони бештар хидмат мерасонад. Тиҷорат ба ҷавонон дар таълими ҷои кор кӯмак мерасонад.
    Тиҷорат даромади худро 15% афзоиш дод ва шароити кории мутахассисони худро беҳтар кард.
  `,
    short_en: `Cooperative “Parshed” has been operating since 1988 as the first car maintenance unit in GBAO. As the cooperative has a professional technician who learnt his craft during the Soviet Union, it attracts clients from all parts of the GBAO.  The cooperative has received subsidies with the aim to expand its number of boxes from 2 to 5 to have more spaces for cars and offer shelter for the cars especially in winter and in the rainy seasons.
    The business now serves more clients due to the improved spaces and created an additional permanent job. The business supports young men in job training.
    The business increased its income by 15% and improved the working conditions for its specialists.
  `,
    short_de: `Die Genossenschaft „Parshed“ ist seit 1988 als erste Autowartungseinheit in GBAO tätig. Da die Genossenschaft über einen professionellen Techniker verfügt, der sein Handwerk während der Sowjetunion erlernt hat, zieht sie Kunden aus allen Teilen der GBAO an. Die Genossenschaft hat Zuschüsse erhalten mit dem Ziel, die Anzahl ihrer Boxen von 2 auf 5 zu erweitern, um mehr Platz für Autos zu haben und den Autos vor allem im Winter und in der Regenzeit Unterschlupf zu bieten.
    Aufgrund der verbesserten Räumlichkeiten bedient das Unternehmen nun mehr Kunden und hat einen zusätzlichen festen Arbeitsplatz geschaffen. Das Unternehmen unterstützt junge Männer bei der Berufsausbildung.
    Das Unternehmen steigerte seine Einnahmen um 15 % und verbesserte die Arbeitsbedingungen seiner Fachkräfte.
  `,
    category_id: 1,
    banner_url: "parshed",
    implementation: "",
    location: [37.40243100000000, 71.63991100000000],
    district_id: 7,
    village_id: 2,
    giz_programme_id: 1,
    adress_ru: "",
    adress_tj: "",
    adress_en: "Bar-khorog",
    adress_de: "",
    created_at: "",
  },
  {
    project_id: 9,
    name_ru: "Молочный кластер Занутж",
    name_tj: "Нуқтаи ҷамъоварии шир Занузҷ",
    name_en: `Dairy Cluster Zanuthj`,
    name_de: "Molkereicluster Zanuthj",
    short_ru: `Пункт сбора молока в селе Зануздж Рошткала был открыт AKF на основании грантового соглашения в рамках проекта «Местное экономическое развитие в выбранном высокогорном регионе». В пункте сбора имеется резервуар-охладитель, а также автомобиль для перевозки молока для сбора молока от молочных фермеров в разных деревнях. В общей сложности MSDSP и GIZ создали семь групп производителей молочной продукции для подключения к рынку. На данный момент более 100 женщин получают выгоду от продажи сырого молока. Каждую неделю на центральном рынке перевозится и реализуется более 1000 л молока.
  `,
    short_tj: `Нуқтаи ҷамъоварии шир дар деҳаи Занузҷ, Рошткала, аз ҷониби AKF дар асоси созишномаи грантӣ дар доираи лоиҳаи "Local Economic Development in Selected High Mountainous Region"таъсис дода шудааст. Дар нуқтаи ҷамъоварӣ як зарфи хунуккунӣ ва инчунин як мошин барои ҷамъоварии шир аз чорводорон дар деҳаҳои гуногун мавҷуд аст. ДАР МАҶМӮЪ, MSDSP ва GIZ ҳафт гурӯҳи истеҳсолкунандагони ширро барои ворид шудан ба бозор таъсис доданд. Дар айни замон, зиеда аз 100 зан аз фурӯши шири хом баҳра мебаранд. Ҳар ҳафта зиеда аз 1000 литр шир дар бозори марказӣ интиқол ва фурӯхта мешавад.
  `,
    short_en: `The milk collection point in Zanuthj Village, Roshtqala has been established by AKF based on a grant agreement under the project “Local Economic Development in Selected High Mountainous Region”. The collection point has a cooling tank as well as a milk transportation vehicle to collect milk from dairy farmers in different villages. Altogether seven dairy producer groups have been established both by MSDSP and GIZ to get connected to the market. At the moment more than 100 women are benefiting from selling raw milk. Every week more than 1000 L of milk is transported and sold in the central market.
  `,
    short_de: `Die Milchsammelstelle im Dorf Zanuthj, Roshtqala, wurde von AKF auf der Grundlage einer Zuschussvereinbarung im Rahmen des Projekts „Lokale Wirtschaftsentwicklung in ausgewählten Hochgebirgsregionen“ eingerichtet. Die Sammelstelle verfügt über einen Kühltank sowie ein Milchtransportfahrzeug, um Milch von Milchbauern in verschiedenen Dörfern abzuholen. Insgesamt wurden von MSDSP und der GIZ sieben Milcherzeugergruppen gegründet, um sich mit dem Markt zu verbinden. Derzeit profitieren mehr als 100 Frauen vom Verkauf von Rohmilch. Jede Woche werden mehr als 1000 Liter Milch transportiert und auf dem Zentralmarkt verkauft.
  `,
    category_id: 1,
    banner_url: "zanuthj",
    implementation: "",
    location: [37.19405211111111,71.92841611111111],
    district_id: 7,
    village_id: 2,
    giz_programme_id: 1,
    adress_ru: "",
    adress_tj: "",
    adress_en: "Bar-khorog",
    adress_de: "",
    created_at: "",
  },
  {
    project_id: 10,
    name_ru: "Женские группы Кашмир",
    name_tj: "Гурӯҳҳои занони Кашмир",
    name_en: `Cashmire Women Groups`,
    name_de: "Kaschmir-Frauengruppen",
    short_ru: `Дунёбегим Худододова в настоящее время возглавляет три женские группы, занимающиеся прядением кашемировой шерсти. Она начала заниматься прядением вместе с другими женщинами в своей деревне Зануздж в 2016 году в рамках проекта Фонда Ага Хана. В тот раз кашемировая шерсть была привезена из Хирата (Афганистан), прядена в Бадахшане (Таджикистан) и отправлена   на выделку в Согд (Таджикистан), а затем отправлена   в США. для маркетинга и продаж. Кроме того, женским группам была оказана поддержка в создании собственных прядильных мастерских в трех деревнях: Зануздж, Сейд и Барвоз в Рошткалинском районе. С 2020 года после кризиса COVID-19 трансграничные рынки были закрыты, а также остановлен прядильный бизнес. К счастью, в прошлом году, в 2022 году, Фонд Ага Хана создал компанию по переработке кашемировой шерсти в деревне Зануздж Рошткалинский район, где кашемировая шерсть собирается и перерабатывается. В 2023 году при поддержке GIZ женские группы Рошткалы закупили достаточно шерсти для прядения. Кроме того, GIZ оказал поддержку этим трем женским группам прядильщиков, предоставив обогреватели для их мастерских в зимнее время. Кроме того, в этом году представительницы Кашмирских женских групп приняли участие в выставке «Сугд Экспо 2023» и обрели потенциальных покупателей. В настоящее время они сотрудничают с Союзом ремесленников Таджикистана и отправили образцы мешков из кашемира в Японию для привлечения заказов. Тем временем они работают над производством различных шерстяных изделий для продажи на местном рынке, но надеются получить больше заказов как внутри страны, так и за ее пределами. В настоящее время в Рошткалинском районе работают три женские группы, насчитывающие в общей сложности 26 членов.`,
    short_tj: `Дунеи Бегим Худододова дар айни замон, ӯ се гурӯҳи занонаро роҳбарӣ мекунад, ки дар риштаи мӯйҳои кашмирӣ кор мекунанд. Вай дар соли 2016 дар доираи лоиҳаи Фонди Бунеди Оғохон бо занони дигар дар деҳаи Занузҷ ба бофтан шурӯъ кард. Он вақт пашми кашмир аз Хирата, Афғонистон оварда шуда, дар Бадахшони Тоҷикистон пошида шуда, ба Суғд, Тоҷикистон барои хушконидан фиристода шуда, сипас барои маркетинг ва фурӯш ба ИМА фиристода шуд. Ғайр аз он, ба гурӯҳҳои занона дар таъсиси устохонаҳои дӯзандагии худ дар се деҳа - Занузҷ, Сейд ва Барвоз дар ноҳияи Роштқалъа дастгирӣ карда шуд. Аз соли 2020, пас аз хуруҷи COVID-19, бозорҳои фаромарзӣ баста шуданд ва тиҷорати ресандагӣ низ қатъ шуд. Хушбахтона, Соли гузашта, Соли 2022, Фонди Бунеди Оғохон дар деҳаи Занузҷи ноҳияи Рошткалъа ширкати коркарди пашми кашмирро таъсис дод, ки дар он ҷо пашми кашмирро ҷамъоварӣ ва коркард мекунанд. Дар соли 2023, бо дастгирии GIZ, гурӯҳҳои занона дар Рошткалъа миқдори кофии пашм барои ресандагӣ хариданд. Ғайр аз ин, GIZ ин се гурӯҳи занони дӯзандаро дастгирӣ кард, ки дар зимистон барои коргоҳҳои онҳо гармкунакҳо пешниҳод карданд. Ғайр аз ин, имсол намояндагони гурӯҳҳои занонаи Кашмир дар намоишгоҳи Sughd Expo 2023 иштирок карданд ва харидорони эҳтимолӣ пайдо карданд. Ҳоло онҳо бо Иттифоқи ҳунармандони Тоҷикистон ҳамкорӣ доранд ва намунаҳои халтаҳои кашмирро ба Ҷопон фиристодаанд, то фармоишҳоро ҷалб кунанд. Дар ҳамин ҳол, онҳо барои истеҳсоли маҳсулоти гуногуни пашм барои фурӯш дар бозори маҳаллӣ кор мекунанд, аммо умедворанд, ки ҳам дар дохил ва ҳам берун аз он фармоишҳои бештар ба даст оранд. Дар айни замон дар ноҳияи Рошткалъа се гурӯҳи занона фаъолият мекунанд, ки дар маҷмӯъ 26 аъзо доранд.`,
    short_en: `Dunyobegim Khudododova is currently leading three women groups working on spinning cashmire wool. She started spinning with other women in her village Zanuthj in 2016, as part of a project of the Aga Khan Foundation. That time, cashmire wool was brought from Hirat, Afghanistan, spun in Badakhshan Tajikistan, and sent for dying in Sughd, Tajikistan, and then sent to the U.S. for marketing and sales. In addition, the women groups have been supported with the creation of their own spinning workshops in three villages which are Zanuthj, Sejd, and Barvoz in the Roshtqala District. Since 2020 after the COVID-19 breakdown the cross-border markets have been closed and the spinning business has also stopped. Fortunately, last year in 2022 Aga Khan Foundation created a cashmire wool processing company in Zanuthj village, Roshtqala District where cashmire wool is collected and processed. In 2023, with the support of GIZ, the women groups in Roshtqala bought enough wool for spinning. Moreover, GIZ has supported these three spinning women groups with heaters for their workshops in the wintertime. Besides, this year, the representatives of the cashmire women groups have participated in Sughd Expo 2023 and have got potential buyers. They are currently working with the Union of Craftsmen, Tajikistan, and have sent sample cashmire bags to Japan to attract orders. Meanwhile, they are working to produce different woolen products to sell in the local market but hoping to get more orders from in and outside the country. Currently, there are three women groups working in the Roshtqala District with a total of 26 members.  `,
    short_de: `Dunyobegim Khudododova leitet derzeit drei Frauengruppen, die sich mit dem Spinnen von Kaschmirwolle beschäftigen. Sie begann 2016 im Rahmen eines Projekts der Aga Khan Foundation mit anderen Frauen in ihrem Dorf Zanuthj zu spinnen. Damals wurde Kaschmirwolle aus Hirat, Afghanistan, gebracht, in Badakhshan, Tadschikistan, gesponnen, zum Sterben nach Sughd, Tadschikistan, geschickt und dann in die USA geschickt. für Marketing und Vertrieb. Darüber hinaus wurden die Frauengruppen bei der Einrichtung eigener Spinnwerkstätten in drei Dörfern, Zanuthj, Sejd und Barvoz im Distrikt Roshtqala, unterstützt. Seit 2020 sind nach dem Zusammenbruch von COVID-19 die grenzüberschreitenden Märkte geschlossen und auch das Spinnereigeschäft wurde eingestellt. Glücklicherweise hat die Aga Khan Foundation letztes Jahr im Jahr 2022 im Dorf Zanuthj im Distrikt Roshtqala ein Unternehmen zur Verarbeitung von Kaschmirwolle gegründet, in dem Kaschmirwolle gesammelt und verarbeitet wird. Im Jahr 2023 kauften die Frauengruppen in Roshtqala mit Unterstützung der GIZ genügend Wolle zum Spinnen. Darüber hinaus hat die GIZ diese drei Spinnfrauengruppen im Winter mit Heizgeräten für ihre Workshops unterstützt. Außerdem haben in diesem Jahr die Vertreterinnen der Kaschmir-Frauengruppen an der Sughd Expo 2023 teilgenommen und potenzielle Käufer gewonnen. Sie arbeiten derzeit mit der Union of Craftsmen, Tadschikistan, zusammen und haben Mustertaschen aus Kaschmir nach Japan geschickt, um Bestellungen anzuziehen. In der Zwischenzeit arbeiten sie daran, verschiedene Wollprodukte herzustellen, um sie auf dem lokalen Markt zu verkaufen, hoffen aber auf mehr Bestellungen aus dem In- und Ausland. Derzeit sind im Bezirk Roshtqala drei Frauengruppen mit insgesamt 26 Mitgliedern tätig.`,
    category_id: 1,
    banner_url: "cashmire",
    implementation: "",
    location: [37.19418611111111,71.92861011111111],
    district_id: 7,
    village_id: 2,
    giz_programme_id: 1,
    adress_ru: "",
    adress_tj: "",
    adress_en: "Bar-khorog",
    adress_de: "",
    created_at: "",
  },
  
  // {
  //   project_id: 7,
  //   name_ru: "",
  //   name_tj: "",
  //   name_en: `Cooperative Parshed`,
  //   name_de: "",
  //   short_ru: "",
  //   short_tj: "",
  //   short_en: `Cooperative “Parshed” is operating since 1988 as the first car maintenance unit in GBAO. As the cooperative has a professional technician who learnt his craft during the Soviet Union, it attracts clients from all parts of the GBAO.  The cooperative has got subsidies with the aim to expand its number of boxes from 2 to 5 for having more spaces for cars and offer shelter for the cars especially in winter and in the rainy seasons.
  //   The business now serves more clients due to the improved spaces and created an additionally permanent job. The business supports young men in job trainings.
  //   The business increased its income by 15% and improved the working conditions for its specialists.
  //   `,
  //   short_de: "",
  //   category_id: 1,
  //   banner_url: "",
  //   implementation: "",
  //   location: "",
  //   district_id: 1,
  //   village_id: 2,
  //   giz_programme_id: 1,
  //adress_ru: "",
  //   adress_tj: "",
  //   adress_en: "",
  //   adress_de: "",
  //   created_at: "",
  // },
];
interface DataInterface {
  id: number;
  title: string;
  subtitle: string;
  giz_programme_id: number;
  image: StaticImageData;
  district: string;
  district_id: number;
  status: string;
}

interface Data {
  data: DataInterface[];
  filteredData: DataInterface[];
  searchFilter: DataInterface[];
}

interface initialStateTypes {
  loading: boolean;
  error: string | undefined;
  projects: [] | any;
  filteredData: [] | any;
  searchFilter: [] | any;
  inputValue: string;
  selectedDistrict: string;
  selectedProgramme: any;

  viewProject: Projectinterface;
  currentProjectCardOpenId: number;
}

const initialState = {
  filteredData: allProjects,
  searchFilter: [],
  inputValue: "",

  loading: false,
  error: "",
  projects: allProjects,
  selectedDistrict: "All",
  selectedProgramme: { id: 0, name: "All" },
  viewProject: {
    project_id: 1,
    name_ru: "",
    name_tj: "",
    name_en: "",
    name_de: "",
    short_ru: "",
    short_tj: "",
    short_en: "",
    short_de: "",
    location: [],
    category_id: "",
    banner_url: "",
    district_id: 0,
    village_id: "",
    giz_programme_id: 0,
    adress_ru: "",
    adress_tj: "",
    adress_en: "",
    adress_de: "",
    created_at: "",
    updated_at: "",
  },
  currentProjectCardOpenId: 0,
} as initialStateTypes;

export const fetchProject = createAsyncThunk("project/fetchProjects", () => {
  return axios.get(`${API_KEY}/get/project`).then((response) => {
    // console.log(response.data)
    return response.data;
  });
});

// let status: string = "";

export const projects: any = createSlice({
  name: "projetcs",
  initialState,
  reducers: {
    selectFilter: (state, action: PayloadAction<string>) => {
      // status = action.payload;
      if (action.payload == "All") {
        if (state.selectedProgramme.name != "All") {
          state.filteredData = state.projects.filter(
            (project: DataInterface) =>
              project.giz_programme_id == state.selectedProgramme.id
          );
        } else {
          state.filteredData = state.projects;
        }
      } else {
        const districtsIds: any = {
          Khorog: 1,
          Darwoz: 2,
          Vanj: 3,
          Rushon: 4,
          Shughnon: 5,
          Ishkoshim: 6,
          Roshtqala: 7,
          Murghob: 8,
        };
        if (state.selectedProgramme.name !== "All") {
          state.filteredData = state.projects.filter(
            (project: DataInterface) =>
              project.district_id == districtsIds[action.payload] &&
              project.giz_programme_id == state.selectedProgramme.id
          );
        } else {
          state.filteredData = state.projects.filter(
            (project: DataInterface) =>
              project.district_id == districtsIds[action.payload]
          );
        }
      }

      state.selectedDistrict = action.payload;
    },
    programmeFilter: (state, action: PayloadAction<any>) => {
      // status = action.payload;
      const districtsIds: any = {
        Khorog: 1,
        Darwoz: 2,
        Vanj: 3,
        Rushon: 4,
        Shughnon: 5,
        Ishkoshim: 6,
        Roshtqala: 7,
        Murghob: 8,
      };
      if (action.payload.name == "All") {
        if (state.selectedDistrict !== "All") {
         

          state.filteredData = state.projects.filter(
            (project: DataInterface) =>
              project.district_id == districtsIds[state.selectedDistrict]
          );
        } else {
          state.filteredData = state.projects;
        }
      } else {
        if (state.selectedDistrict !== "All") {
          state.filteredData = state.projects.filter(
            (project: DataInterface) =>
              project.giz_programme_id == action.payload.id &&  project.district_id == districtsIds[state.selectedDistrict]
          );
        } else {
          state.filteredData = state.projects.filter(
            (project: DataInterface) =>
              project.giz_programme_id == action.payload.id
          );
        }
      }

      state.selectedProgramme = action.payload;
    },
    viewProject: (state, action: PayloadAction<Projectinterface>) => {
      state.viewProject = action.payload;
    },
    seacrhFilter: (state, action: PayloadAction<string>) => {
      state.filteredData = state.projects.filter(
        (project: Projectinterface) => {
          if (action.payload == "") {
            console.log(current(state.projects));
            return current(project);
            // return project;
          } else if (
            project.name_en.toLowerCase().includes(action.payload.toLowerCase())
          ) {
            console.log(current(state.projects));
            return current(project);
            // return project;
          }
        }
      );
    },
    projectCardExpanded: (state, action: PayloadAction<number>) => {
      state.currentProjectCardOpenId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProject.fulfilled, (state, action: PayloadAction) => {
      state.loading = false;
      state.projects = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProject.rejected, (state, action) => {
      state.loading = false;
      state.projects = [];
      state.error = action.error.message;
    });
  },
});

export const {
  programmeFilter,
  selectFilter,
  viewProject,
  seacrhFilter,
  projectCardExpanded,
} = projects.actions;
export default projects.reducer;
