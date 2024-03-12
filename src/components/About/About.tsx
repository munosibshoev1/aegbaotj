"use client";

import { useAppSelector } from "@/redux/hooks";
import "./About.css"
import { useEffect, useState } from "react";

export default function About() {

  const stateLang: any = useAppSelector((state) => state.LanguageReducer);

  const [lang, setlang] = useState<String>(
    stateLang.language
  );

  useEffect(() => {
    setlang(stateLang.language)
  }, [stateLang.language]);

  return (
    <section
      id="about"
      className="flex items-start justify-between gap-14 px-28 pt-5"
    >
      <div className="geography w-[30%]">

        <h3>{lang == "de" ? `Erdkunde` : lang == "en" ? `Geography` : lang == "tj" ? `Ҷуғрофия` : `География`}</h3>
        <p className="text-justify">
          {
            lang == "de" ? `Tadschikistan ist ein Binnenstaat in Zentralasien. Es grenzt im Süden an Afghanistan, im Westen an Usbekistan, im Norden an Kirgisistan und im Osten an China. Das Land ist größtenteils gebirgig, mit dem Pamir-Gebirge im Osten und dem Fann-Gebirge im Westen. Der höchste Punkt in Tadschikistan ist der Berg Ismoil Somoni, der 7.495 Meter (24.590 Fuß) hoch ist.` : lang == "en" ? ` Tajikistan is a landlocked country in Central Asia. It is bordered by
            Afghanistan to the south, Uzbekistan to the west, Kyrgyzstan to the
            north, and China to the east. The country is mostly mountainous, with
            the Pamir Mountains in the east and the Fann Mountains in the west.
            The highest point in Tajikistan is Mount Ismoil Somoni, which is 7,495
            meters (24,590 feet) tall.`: lang == "tj" ? ` Тоҷикистон кишварест Дар Осиеи Марказӣ, ки ба баҳр дастрасӣ надорад. Он дар ҷануб Бо Афғонистон, Дар ғарб Бо Узбекистон, дар шимол Бо Қирғизистон ва дар шарқ бо Чин ҳамсарҳад аст. Кишвар асосан кӯҳӣ буда, дар шарқ Кӯҳҳои Помир ва дар ғарб Кӯҳҳои Фанн дорад. Баландтарин нуқтаи Тоҷикистон Кӯҳи Исмоил Сомонӣ мебошад, ки баландиаш 7 495 метр (24 590 фут) мебошад.` : ` Таджикистан – не имеющая выхода к морю страна в Центральной Азии. Граничит с Афганистаном на юге, Узбекистаном на западе, Кыргызстаном на севере и Китаем на востоке. Страна в основном гористая, с Памирскими горами на востоке и Фанскими горами на западе. Самая высокая точка Таджикистана — гора Исмоила Сомони, высота которой составляет 7 495 метров (24 590 футов).`
          }

        </p>
      </div>
      <div className="w-[70%]">
        <div className="card-container flex items-start gap-10">
          <div className="mb-2">

            <h3>{lang == "de" ? `Hauptstadt` : lang == "en" ? `Capital` : lang == "tj" ? `Пойтахт` : `Столица`}</h3>
            <p className="text-justify">
              {
                lang == "de" ? `Die Hauptstadt Tadschikistans ist Duschanbe. Duschanbe ist eine große Stadt mit einer Bevölkerung von über 1 Million Menschen. Es liegt im südwestlichen Teil des Landes, in den Ausläufern des Fann-Gebirges.`
                  : lang == "en" ? `  The capital of Tajikistan is Dushanbe. Dushanbe is a large city
            with a population of over 1 million people. It is located in the
            southwestern part of the country, in the foothills of the Fann
            Mountains.`: lang == "tj" ? `Пойтахти Тоҷикистон Душанбе. Душанбе шаҳри калонест, ки беш аз 1 миллион аҳолӣ дорад. Он дар қисми ҷанубу ғарбии кишвар, дар пояи Кӯҳҳои Фанн ҷойгир аст.`
                    : `Столица Таджикистана Душанбе. Душанбе – крупный город с населением более 1 млн человек. Он расположен в юго-западной части страны, в предгорьях Фанских гор.`
              }

            </p>
          </div>
          <div className="mb-2">
            <h3>{lang == "de" ? `Menschen` : lang == "en" ? `People` : lang == "tj" ? `Мардум` : `Люди`}</h3>
            <p className="text-justify">
              {
                lang == "de" ? `Die Mehrheit der Menschen in Tadschikistan sind Tadschiken. Tadschiken sind ein persischsprachiges Volk, das seit Jahrhunderten in der Region lebt. Weitere ethnische Gruppen in Tadschikistan sind Usbeken, Kirgisen und Russen.`
                  : lang == "en" ? `  The majority of the people in Tajikistan are Tajiks. Tajiks are a
                Persian-speaking people who have lived in the region for centuries. Other ethnic groups in Tajikistan include Uzbeks,
                Kyrgyz, and Russians.`
                    : lang == "tj" ? `Аксарияти сокинони Тоҷикистон тоҷикон мебошанд. Тоҷикон мардуми форсизабон мебошанд, ки асрҳо дар ин минтақа зиндагӣ мекарданд. Дигар гурӯҳҳои этникӣ дар Тоҷикистон узбекҳо, қирғизҳо ва русҳоро дар бар мегиранд.`
                      : `Большинство населения Таджикистана составляют таджики. Таджики – персоязычный народ, веками живший в этом регионе. Другие этнические группы в Таджикистане включают узбеков, кыргызов и русских.`
              }


            </p>
          </div>
        </div>
        <div className="card-container flex items-start gap-10 mt-2">
          <div className="language">

            <h3>{lang == "de" ? `Sprache` : lang == "en" ? `Language` : lang == "tj" ? `Забон` : `Язык`}</h3>
            <p className="text-justify">
              {
                lang == "de" ? `Die offizielle Sprache Tadschikistans ist Tadschikisch. Tadschikisch ist eine persische Sprache, die eng mit Farsi verwandt ist. Weitere in Tadschikistan gesprochene Sprachen sind Usbekisch, Kirgisisch und Russisch.`
                  : lang == "en" ? `The official language of Tajikistan is Tajik. Tajik is a Persian
                language that is closely related to Farsi. Other languages spoken
                in Tajikistan include Uzbek, Kyrgyz, and Russian.`
                    : lang == "tj" ? `Забони расмии Тоҷикистон забони тоҷикӣ мебошад. Тоҷикӣ забони форсӣ аст, ки бо форсӣ зич алоқаманд аст. Дигар забонҳое, ки Дар Тоҷикистон ҳарф мезананд, забонҳои узбекӣ, қирғизӣ ва русиро дар бар мегиранд.`
                      : `Официальный язык Таджикистана – таджикский. Таджикский — персидский язык, тесно связанный с фарси. Другие языки, на которых говорят в Таджикистане, включают узбекский, кыргызский и русский.`
              }

            </p>
          </div>
          <div className="religion">
            <h3>{lang == "de" ? `Religion` : lang == "en" ? `Religion` : lang == "tj" ? `Дин` : `Религия`}</h3>
            <p className="text-justify">
              {
                lang == "de" ? `Die Mehrheit der Menschen in Tadschikistan sind Muslime. Der Islam ist die offizielle Religion des Landes. Andere religiöse Gruppen in Tadschikistan sind Christen, Juden und Buddhisten.`
                  : lang == "en" ? `The majority of the people in Tajikistan are Muslims. Islam is the
                official religion of the country. Other religious groups in
                Tajikistan include Christians, Jews, and Buddhists.`
                    : lang == "tj" ? `Аксарияти аҳолии Тоҷикистон мусулмонанд. Ислом дини расмии кишвар аст. Дигар гурӯҳҳои динӣ дар Тоҷикистон масеҳиен, яҳудиен ва буддоиенро дар бар мегиранд.`
                      : `Большинство населения Таджикистана – мусульмане. Ислам является официальной религией страны. Другие религиозные группы в Таджикистане включают христиан, иудеев и буддистов.`
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
