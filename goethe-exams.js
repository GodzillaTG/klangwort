(() => {
  const $g = selector => document.querySelector(selector);
  const tf = ['Richtig', 'Falsch'];
  const yn = ['Ja', 'Nein'];
  const q = (id, prompt, options, answer, en, extra = {}) => ({ id, prompt, options, answer, en, ...extra });
  const part = (title, instruction, sourceTitle, source, questions, extra = {}) => ({ title, instruction, sourceTitle, source, questions, ...extra });

  const b1Reading = [
    part('Teil 1', 'Lesen Sie den Blogbeitrag. Sind die Aussagen Richtig oder Falsch?', 'Ein Konzert für unser Viertel', `Am vergangenen Samstag fand in unserem Stadtteil zum ersten Mal ein Nachbarschaftskonzert statt. Die Idee kam von unserer Musiklehrerin Frau Kern. Sie wollte nicht nur ihre Schülerinnen und Schüler auftreten lassen, sondern auch Menschen zusammenbringen, die sich im Alltag kaum begegnen.

Ursprünglich sollte das Konzert im Park stattfinden. Weil es am Vormittag stark regnete, zog die Veranstaltung kurzfristig in die Turnhalle der Grundschule um. Viele Besucher erfuhren davon über eine Nachricht in der Nachbarschafts-App. Trotzdem kamen fast zweihundert Personen.

Besonders schön war, dass nicht nur Profis auf der Bühne standen. Ein pensionierter Busfahrer spielte Akkordeon, Jugendliche präsentierten eigene Lieder und eine türkische Familie sang traditionelle Stücke. Der Eintritt war kostenlos. Am Ausgang konnte man freiwillig für neue Instrumente der Schule spenden. Am Ende kamen 860 Euro zusammen. Im Herbst soll es wieder ein Konzert geben – dann hoffentlich draußen.`, [
      q('b1-l-01', 'Die Musiklehrerin wollte mit dem Konzert Kontakte im Viertel fördern.', tf, 'Richtig', 'The music teacher wanted the concert to encourage connections in the neighborhood.'),
      q('b1-l-02', 'Das Konzert fand wie geplant im Park statt.', tf, 'Falsch', 'The concert took place in the park as planned.'),
      q('b1-l-03', 'Die Besucher wurden unter anderem digital über den neuen Ort informiert.', tf, 'Richtig', 'Visitors were informed digitally about the new location, among other ways.'),
      q('b1-l-04', 'Nur professionelle Musikerinnen und Musiker traten auf.', tf, 'Falsch', 'Only professional musicians performed.'),
      q('b1-l-05', 'Für den Besuch musste man eine Eintrittskarte kaufen.', tf, 'Falsch', 'Visitors had to buy a ticket.'),
      q('b1-l-06', 'Mit den Spenden sollen Instrumente gekauft werden.', tf, 'Richtig', 'The donations are intended to buy instruments.')
    ]),
    part('Teil 2', 'Lesen Sie die beiden Pressetexte. Wählen Sie bei jeder Aufgabe a, b oder c.', 'Zwei Meldungen', `TEXT A · Eine Bibliothek der Dinge
In Leipzig kann man seit sechs Monaten nicht nur Bücher, sondern auch Werkzeuge, Küchengeräte und Campingausrüstung ausleihen. Wer einen Bibliotheksausweis besitzt, bezahlt keine zusätzliche Gebühr. Besonders beliebt sind Bohrmaschinen, die viele Menschen nur selten brauchen. Das Projekt möchte Geld sparen und den Konsum reduzieren. Wegen der großen Nachfrage wird die Ausleihe ab September auch samstags öffnen.

TEXT B · Kino ohne Auto
Ein altes Autokino am Stadtrand wurde zu einem Fahrradkino umgebaut. Die Zuschauer kommen mit dem Rad und erzeugen einen Teil des Stroms für die Filmvorführung selbst: Zwanzig Fahrräder sind mit kleinen Generatoren verbunden. Wer nicht treten möchte, darf trotzdem zuschauen. Bei schlechtem Wetter wird der Film in einer benachbarten Halle gezeigt. Getränke werden nur in Mehrwegbechern verkauft.`, [
      q('b1-l-07', 'Was kann man in der Leipziger Bibliothek zusätzlich ausleihen?', ['Möbel', 'Alltagsgeräte', 'Lebensmittel'], 'Alltagsgeräte', 'What can be borrowed in addition at the Leipzig library?'),
      q('b1-l-08', 'Warum sind Bohrmaschinen besonders gefragt?', ['Viele benutzen sie nur gelegentlich.', 'Sie sind in Geschäften nicht erhältlich.', 'Man darf sie länger als Bücher behalten.'], 'Viele benutzen sie nur gelegentlich.', 'Why are drills especially popular?'),
      q('b1-l-09', 'Was ändert sich im September?', ['Der Ausweis wird teurer.', 'Es gibt einen weiteren Öffnungstag.', 'Campingausrüstung wird abgeschafft.'], 'Es gibt einen weiteren Öffnungstag.', 'What changes in September?'),
      q('b1-l-10', 'Was ist das Besondere am Fahrradkino?', ['Die Filme handeln nur vom Radfahren.', 'Ein Teil des Stroms wird von Besuchern produziert.', 'Alle Zuschauer müssen während des Films fahren.'], 'Ein Teil des Stroms wird von Besuchern produziert.', 'What is special about the bicycle cinema?'),
      q('b1-l-11', 'Was passiert bei Regen?', ['Die Vorstellung fällt aus.', 'Man zeigt einen anderen Film.', 'Die Vorstellung findet drinnen statt.'], 'Die Vorstellung findet drinnen statt.', 'What happens when it rains?'),
      q('b1-l-12', 'Wie vermeidet das Kino Müll?', ['Es verkauft keine Getränke.', 'Es benutzt wiederverwendbare Becher.', 'Es erlaubt nur eigene Flaschen.'], 'Es benutzt wiederverwendbare Becher.', 'How does the cinema avoid waste?')
    ]),
    part('Teil 3', 'Welche Anzeige passt zu welcher Situation? Eine Anzeige kann nur einmal gewählt werden. Für eine Situation gibt es keine passende Anzeige: Wählen Sie 0.', 'Anzeigen A–H', `A · Abendkurs Deutsch fürs Büro, Di/Do 18:30–20:00, mit E-Mail-Training.
B · Filmclub Originalton: Jeden Freitag deutsche Filme mit deutschen Untertiteln.
C · Gesprächscafé am Sonntag: kostenlos, ohne Anmeldung, Niveau A2–B2.
D · Aussprache online: Einzelunterricht per Video, Termine frei wählbar.
E · Schreibwerkstatt Hochschule: wissenschaftliche Texte, nur für Studierende.
F · Deutsch im Hotel: dreiwöchiges Praktikum mit Unterkunft, Juli und August.
G · Hörtraining unterwegs: neue Podcasts mit Übungen, kostenlos in unserer App.
H · Kinder lesen vor: Ehrenamtliche für die Stadtbibliothek gesucht, Mittwoch nachmittags.`, [
      q('b1-l-13', 'Mina studiert und möchte bessere Seminararbeiten auf Deutsch schreiben.', ['A','B','C','D','E','F','G','H','0'], 'E', 'Mina is a student and wants to write better academic papers in German.'),
      q('b1-l-14', 'Leo arbeitet tagsüber und braucht Deutsch für berufliche Nachrichten.', ['A','B','C','D','E','F','G','H','0'], 'A', 'Leo works during the day and needs German for professional messages.'),
      q('b1-l-15', 'Sara möchte ihre Aussprache trainieren, hat aber jede Woche andere Arbeitszeiten.', ['A','B','C','D','E','F','G','H','0'], 'D', 'Sara wants to practise pronunciation but has different work hours every week.'),
      q('b1-l-16', 'Tom möchte beim Zugfahren regelmäßig Hörverstehen üben.', ['A','B','C','D','E','F','G','H','0'], 'G', 'Tom wants to practise listening regularly while travelling by train.'),
      q('b1-l-17', 'Ana sucht im Sommer Arbeit im Tourismus und braucht eine Unterkunft.', ['A','B','C','D','E','F','G','H','0'], 'F', 'Ana is looking for tourism work in summer and needs accommodation.'),
      q('b1-l-18', 'David möchte am Wochenende spontan und kostenlos Deutsch sprechen.', ['A','B','C','D','E','F','G','H','0'], 'C', 'David wants to speak German spontaneously and free of charge at the weekend.'),
      q('b1-l-19', 'Nora sucht einen Intensivkurs am Vormittag mit Kinderbetreuung.', ['A','B','C','D','E','F','G','H','0'], '0', 'Nora is looking for a morning intensive course with childcare.')
    ]),
    part('Teil 4', 'Lesen Sie die Meinungen zum Thema „Handys in Konzerten“. Ist die Person für ein Verbot?', 'Stimmen aus einem Forum', `20 · LENA: Ein Foto als Erinnerung finde ich völlig normal. Aber wer das ganze Konzert filmt, stört andere. Ein komplettes Verbot wäre trotzdem zu streng.
21 · MARKUS: Ich habe viel Geld für die Karte bezahlt und sehe dann nur leuchtende Displays. Im Saal sollten Telefone ausgeschaltet bleiben.
22 · AYLİN: Künstler können selbst entscheiden, ob Fotos erlaubt sind. Eine allgemeine Regel für alle Konzerte halte ich nicht für sinnvoll.
23 · JONAS: Ohne Handybilder entdecken viele Menschen neue Bands gar nicht. Kurze Videos sind heute Teil der Musikkultur.
24 · EVA: Bei klassischen Konzerten zerstören Klingeltöne und Bildschirme die Konzentration. Dort sollte die Nutzung untersagt sein.
25 · BEN: Ein Verbot lässt sich kaum kontrollieren. Besser wären besondere Bereiche für Menschen, die filmen möchten.
26 · MIRA: Ich möchte Musik direkt erleben. Seit in einem kleinen Club alle Telefone abgegeben wurden, wünsche ich mir das überall.`, [
      q('b1-l-20', 'Lena', yn, 'Nein', 'Is Lena in favour of a ban?'),
      q('b1-l-21', 'Markus', yn, 'Ja', 'Is Markus in favour of a ban?'),
      q('b1-l-22', 'Aylin', yn, 'Nein', 'Is Aylin in favour of a ban?'),
      q('b1-l-23', 'Jonas', yn, 'Nein', 'Is Jonas in favour of a ban?'),
      q('b1-l-24', 'Eva', yn, 'Ja', 'Is Eva in favour of a ban?'),
      q('b1-l-25', 'Ben', yn, 'Nein', 'Is Ben in favour of a ban?'),
      q('b1-l-26', 'Mira', yn, 'Ja', 'Is Mira in favour of a ban?')
    ]),
    part('Teil 5', 'Lesen Sie die Hausordnung. Wählen Sie bei jeder Aufgabe a, b oder c.', 'Proberaum Klanghaus · Hausordnung', `1. Die Räume dürfen montags bis samstags von 9 bis 22 Uhr genutzt werden. Sonntags bleibt das Gebäude geschlossen.
2. Reservierungen können bis 24 Stunden vorher kostenlos storniert werden. Danach wird die Hälfte des Preises berechnet.
3. Getränke sind erlaubt, müssen aber in verschließbaren Flaschen mitgebracht werden. Essen ist in den Proberäumen nicht gestattet.
4. Nach der Probe sind Kabel ordentlich aufzuhängen, Fenster zu schließen und eigene Gegenstände mitzunehmen.
5. Schäden an Instrumenten oder Technik müssen sofort an der Rezeption gemeldet werden. Reparaturen dürfen nicht selbst vorgenommen werden.`, [
      q('b1-l-27', 'Wann kann man im Klanghaus proben?', ['Jeden Tag', 'Samstags bis 22 Uhr', 'Sonntags nur vormittags'], 'Samstags bis 22 Uhr', 'When can people rehearse at Klanghaus?'),
      q('b1-l-28', 'Was kostet eine sehr späte Stornierung?', ['Nichts', 'Den halben Preis', 'Den vollen Preis'], 'Den halben Preis', 'What does a very late cancellation cost?'),
      q('b1-l-29', 'Was darf man in den Proberaum mitnehmen?', ['Eine geschlossene Wasserflasche', 'Ein warmes Abendessen', 'Nur leere Flaschen'], 'Eine geschlossene Wasserflasche', 'What may be brought into the rehearsal room?'),
      q('b1-l-30', 'Was soll man bei einem technischen Problem tun?', ['Es selbst reparieren', 'Es sofort melden', 'Bis zum nächsten Tag warten'], 'Es sofort melden', 'What should one do when there is a technical problem?')
    ])
  ];

  const b1ShortAudios = [
    { key:'b1-h-a1', text:'Guten Tag, hier ist die Praxis Dr. Vogt. Ihr Termin morgen um neun Uhr muss leider auf elf Uhr verschoben werden. Bitte bringen Sie wie immer Ihre Versichertenkarte mit. Falls elf Uhr nicht möglich ist, rufen Sie uns heute bis achtzehn Uhr zurück.', truth:'Richtig', detail:'die Versichertenkarte' },
    { key:'b1-h-a2', text:'Achtung, eine Information für Reisende nach Dresden. Der Regionalexpress um vierzehn Uhr zwölf fährt heute nicht von Gleis sieben, sondern von Gleis neun. Wegen Bauarbeiten kommt er voraussichtlich zehn Minuten später an.', truth:'Falsch', detail:'Gleis neun benutzen' },
    { key:'b1-h-a3', text:'Und nun das Wetter. Im Norden bleibt es trocken und sonnig. Im Süden beginnt es am Nachmittag zu regnen. Die Temperaturen liegen zwischen siebzehn und zweiundzwanzig Grad.', truth:'Richtig', detail:'Regen' },
    { key:'b1-h-a4', text:'Hallo Mia, ich bin schon im Kino. Der Film beginnt erst um halb neun, nicht um acht. Kannst du bitte noch die Karten an der Kasse abholen? Ich warte im Café neben dem Eingang.', truth:'Falsch', detail:'die Karten abholen' },
    { key:'b1-h-a5', text:'Liebe Kundinnen und Kunden, wegen einer technischen Störung können Sie heute nur bar bezahlen. Der Geldautomat gegenüber der Bäckerei ist geöffnet. Kartenzahlung ist voraussichtlich ab morgen wieder möglich.', truth:'Richtig', detail:'bar' }
  ];
  const b1Listening1 = b1ShortAudios.flatMap((audio,index) => [
    q(`b1-h-${String(index*2+1).padStart(2,'0')}`, index === 0 ? 'Der Termin findet morgen später statt.' : index === 1 ? 'Der Zug nach Dresden fällt heute aus.' : index === 2 ? 'Die Wettervorhersage kündigt Sonne im Norden an.' : index === 3 ? 'Der Film beginnt um acht Uhr.' : 'Heute funktioniert die Kartenzahlung nicht.', tf, audio.truth, 'Decide whether the statement matches the announcement.', {audio:audio.text,audioKey:audio.key,repeats:2}),
    q(`b1-h-${String(index*2+2).padStart(2,'0')}`, index === 0 ? 'Was soll die Patientin mitbringen?' : index === 1 ? 'Was sollen die Reisenden tun?' : index === 2 ? 'Was wird für den Süden erwartet?' : index === 3 ? 'Was soll Mia machen?' : 'Wie sollen Kunden heute bezahlen?', index === 0 ? ['zehn Euro','die Versichertenkarte','ein Rezept'] : index === 1 ? ['Gleis neun benutzen','einen Bus nehmen','morgen reisen'] : index === 2 ? ['Schnee','starken Wind','Regen'] : index === 3 ? ['im Café bestellen','die Karten abholen','den Film wechseln'] : ['online','bar','mit Karte'], audio.detail, 'Choose the requested detail from the announcement.', {audio:audio.text,audioKey:audio.key,repeats:2})
  ]);
  const b1TourAudio = `Willkommen im neuen Medienhaus. Im Erdgeschoss finden Sie die Bibliothek und das Café. Die Ausstellung zur Geschichte des Radios liegt im ersten Stock und ist heute vollständig geöffnet. Unsere Führung beginnt dort um zehn Uhr dreißig. Fotografieren dürfen Sie ohne Blitz. Um zwölf Uhr treffen wir uns wieder im Café. Wer anschließend das Tonstudio besuchen möchte, muss sich vorher an der Information anmelden, denn dort gibt es nur zwölf Plätze. Das Museum schließt heute wegen einer Veranstaltung bereits um siebzehn Uhr.`;
  const b1ConversationAudio = `Mann: Wie war dein erster Tag im neuen Coworking-Büro? Frau: Viel ruhiger als erwartet. Ich hatte zuerst Angst, dass ständig jemand telefoniert. Mann: Gibt es dort feste Arbeitsplätze? Frau: Nur für Teams. Einzelpersonen suchen sich jeden Morgen einen freien Tisch. Ich war schon um acht Uhr da und konnte am Fenster sitzen. Mann: Und die Technik? Frau: Sehr gut. Nur das WLAN war am Vormittag kurz weg. Dafür hat mir eine Mitarbeiterin sofort geholfen. In der Küche habe ich zwei Designerinnen kennengelernt. Wir wollen nächste Woche zusammen Mittag essen. Mann: Bleibst du dort? Frau: Ja, mindestens drei Monate. Danach entscheidet meine Firma, ob wir ein eigenes Büro mieten.`;
  const b1DiscussionAudio = `Moderatorin: Heute diskutieren wir über kostenlose Kulturangebote. Lena: Ich finde, Museen sollten wenigstens einen kostenlosen Tag im Monat anbieten. So können auch Familien mit wenig Geld kommen. Paul: Grundsätzlich ja, aber Kultur kostet. Musiker, Techniker und Aufsichtspersonal müssen bezahlt werden. Lena: Natürlich. Die Stadt könnte solche Tage finanzieren. Paul: Mir wäre ein günstiges Jahresticket lieber. Dann kommen Besucher nicht alle gleichzeitig. Moderatorin: Und was ist mit Online-Angeboten? Lena: Digitale Führungen sind hilfreich, ersetzen aber nicht das echte Erlebnis. Paul: Für Menschen auf dem Land können sie trotzdem sehr wichtig sein.`;
  const b1Listening = [
    part('Teil 1', 'Sie hören fünf kurze Texte. Jeden Text hören Sie zweimal. Lösen Sie zu jedem Text zwei Aufgaben.', '', '', b1Listening1),
    part('Teil 2', 'Sie hören einen Text einmal. Wählen Sie bei jeder Aufgabe a, b oder c.', '', '', [
      q('b1-h-11','Wo beginnt die Führung?',['im Erdgeschoss','im ersten Stock','im Tonstudio'],'im ersten Stock','Where does the tour begin?'),
      q('b1-h-12','Was ist beim Fotografieren verboten?',['ein Blitz','ein Handy','eine Kamera'],'ein Blitz','What is forbidden when taking photos?'),
      q('b1-h-13','Wo trifft sich die Gruppe um zwölf Uhr?',['im Café','an der Information','vor dem Haus'],'im Café','Where does the group meet at noon?'),
      q('b1-h-14','Für welchen Besuch ist eine Anmeldung nötig?',['Bibliothek','Radioausstellung','Tonstudio'],'Tonstudio','Which visit requires registration?'),
      q('b1-h-15','Wann schließt das Museum?',['um 12 Uhr','um 17 Uhr','um 18 Uhr'],'um 17 Uhr','When does the museum close?')
    ],{audio:b1TourAudio,audioKey:'b1-h-tour',repeats:1}),
    part('Teil 3', 'Sie hören ein Gespräch einmal. Sind die Aussagen Richtig oder Falsch?', '', '', [
      q('b1-h-16','Die Frau fand das Büro lauter als erwartet.',tf,'Falsch','The woman found the office noisier than expected.'),
      q('b1-h-17','Einzelpersonen haben dort feste Schreibtische.',tf,'Falsch','Individuals have fixed desks there.'),
      q('b1-h-18','Die Frau kam um acht Uhr an.',tf,'Richtig','The woman arrived at eight.'),
      q('b1-h-19','Das Internet funktionierte den ganzen Vormittag problemlos.',tf,'Falsch','The internet worked without problems all morning.'),
      q('b1-h-20','Eine Mitarbeiterin unterstützte die Frau.',tf,'Richtig','An employee helped the woman.'),
      q('b1-h-21','Die Frau lernte zwei Designerinnen kennen.',tf,'Richtig','The woman met two designers.'),
      q('b1-h-22','Ihre Firma hat bereits entschieden, ein eigenes Büro zu mieten.',tf,'Falsch','Her company has already decided to rent its own office.')
    ],{audio:b1ConversationAudio,audioKey:'b1-h-conversation',repeats:1}),
    part('Teil 4', 'Sie hören eine Diskussion zweimal. Wer sagt was?', '', '', [
      q('b1-h-23','Mindestens einmal im Monat sollte der Eintritt frei sein.',['Moderatorin','Lena','Paul'],'Lena','Who says admission should be free at least once a month?'),
      q('b1-h-24','Beschäftigte im Kulturbereich müssen bezahlt werden.',['Moderatorin','Lena','Paul'],'Paul','Who says cultural workers must be paid?'),
      q('b1-h-25','Öffentliche Mittel könnten kostenlose Tage ermöglichen.',['Moderatorin','Lena','Paul'],'Lena','Who says public funding could enable free days?'),
      q('b1-h-26','Ein günstiges Jahresticket wäre die bessere Lösung.',['Moderatorin','Lena','Paul'],'Paul','Who prefers an inexpensive annual ticket?'),
      q('b1-h-27','Zu viele Besucher am selben Tag sind problematisch.',['Moderatorin','Lena','Paul'],'Paul','Who sees too many visitors on one day as a problem?'),
      q('b1-h-28','Digitale Angebote können den Museumsbesuch nicht vollständig ersetzen.',['Moderatorin','Lena','Paul'],'Lena','Who says digital offers cannot fully replace a museum visit?'),
      q('b1-h-29','Online-Angebote helfen Menschen außerhalb der Städte.',['Moderatorin','Lena','Paul'],'Paul','Who says online offers help people outside cities?'),
      q('b1-h-30','Das Thema der Sendung sind kostenlose Kulturangebote.',['Moderatorin','Lena','Paul'],'Moderatorin','Who introduces the topic of free cultural offers?')
    ],{audio:b1DiscussionAudio,audioKey:'b1-h-discussion',repeats:2})
  ];

  const b2Reading = [
    part('Teil 1', 'Lesen Sie vier Forumsbeiträge. Auf welche Person trifft die Aussage zu? Personen können mehrfach gewählt werden.', 'Arbeiten ohne festes Büro', `A · NORA: Ich arbeite seit zwei Jahren komplett unterwegs. Entscheidend ist für mich nicht der Ort, sondern eine stabile Verbindung und Ruhe. In Cafés kann ich mich allerdings kaum konzentrieren.
B · LEON: Drei Tage im Büro und zwei zu Hause sind ideal. Kreative Besprechungen gelingen persönlich besser, während ich komplexe Aufgaben daheim schneller erledige.
C · SAMIRA: Mein Team lebt in fünf Ländern. Wir dokumentieren Entscheidungen schriftlich und vermeiden unnötige Videokonferenzen. Dadurch können alle zu ihrer produktivsten Zeit arbeiten.
D · FELIX: Nach einem Jahr Homeoffice bin ich bewusst in ein gemeinsames Atelier gezogen. Die spontanen Gespräche haben mir gefehlt. Den Arbeitsweg nehme ich dafür gern in Kauf.`, [
      q('b2-l-01','Wer braucht zum Arbeiten vor allem eine störungsfreie Umgebung?',['A','B','C','D'],'A','Who mainly needs an environment without distractions?'),
      q('b2-l-02','Wer hält unterschiedliche Orte für unterschiedliche Aufgaben geeignet?',['A','B','C','D'],'B','Who considers different places suitable for different tasks?'),
      q('b2-l-03','Wer arbeitet mit Personen in mehreren Staaten zusammen?',['A','B','C','D'],'C','Who works with people in several countries?'),
      q('b2-l-04','Wer akzeptiert wieder einen längeren Weg zur Arbeit?',['A','B','C','D'],'D','Who accepts commuting again?'),
      q('b2-l-05','Wer möchte weniger synchron kommunizieren?',['A','B','C','D'],'C','Who wants less synchronous communication?'),
      q('b2-l-06','Wer vermisst informellen Austausch mit anderen?',['A','B','C','D'],'D','Who misses informal exchange with others?'),
      q('b2-l-07','Wer kann sich an öffentlichen Orten schlecht konzentrieren?',['A','B','C','D'],'A','Who cannot concentrate well in public places?'),
      q('b2-l-08','Wer bevorzugt eine Kombination aus Präsenz und Homeoffice?',['A','B','C','D'],'B','Who prefers a combination of office presence and home office?'),
      q('b2-l-09','Für wen ist schriftliche Dokumentation besonders wichtig?',['A','B','C','D'],'C','For whom is written documentation particularly important?')
    ]),
    part('Teil 2', 'Welche Sätze A–H passen in die Lücken? Zwei Sätze passen nicht.', 'Warum wir Pausen unterschätzen', `Viele Menschen betrachten Pausen als Unterbrechung produktiver Arbeit. Dabei zeigen Untersuchungen, dass kurze Erholungsphasen die Konzentration stabilisieren. [10]

Besonders wirksam sind Pausen, wenn man den Arbeitsplatz tatsächlich verlässt. Ein Blick auf soziale Medien bietet dem Gehirn dagegen kaum Erholung. [11] Ein kurzer Spaziergang oder einige ruhige Atemzüge sind meist sinnvoller.

Auch der Zeitpunkt spielt eine Rolle. Wer erst pausiert, wenn nichts mehr geht, wartet zu lange. [12] Dadurch lässt sich ein starker Leistungsabfall verhindern.

In Teams entsteht jedoch häufig sozialer Druck. Beschäftigte fürchten, unmotiviert zu wirken, wenn sie regelmäßig aufstehen. [13] Führungskräfte können hier ein gutes Beispiel geben.

Manche Unternehmen richten inzwischen stille Räume oder kleine Gärten ein. [14] Entscheidend bleibt aber, dass Mitarbeitende diese Angebote ohne schlechtes Gewissen nutzen dürfen.

Eine Pause muss übrigens nicht lang sein. [15] Regelmäßigkeit ist wichtiger als Dauer.`, [
      q('b2-l-10','Lücke 10',['A','B','C','D','E','F','G','H'],'C','Choose the sentence for gap 10.'),
      q('b2-l-11','Lücke 11',['A','B','C','D','E','F','G','H'],'F','Choose the sentence for gap 11.'),
      q('b2-l-12','Lücke 12',['A','B','C','D','E','F','G','H'],'A','Choose the sentence for gap 12.'),
      q('b2-l-13','Lücke 13',['A','B','C','D','E','F','G','H'],'H','Choose the sentence for gap 13.'),
      q('b2-l-14','Lücke 14',['A','B','C','D','E','F','G','H'],'D','Choose the sentence for gap 14.'),
      q('b2-l-15','Lücke 15',['A','B','C','D','E','F','G','H'],'B','Choose the sentence for gap 15.')
    ],{legend:`A · Sinnvoll ist ein Rhythmus, der Erholung einplant, bevor Müdigkeit entsteht.
B · Oft reichen bereits fünf Minuten.
C · Ohne solche Phasen steigt die Fehlerquote deutlich.
D · Solche räumlichen Angebote können die neue Kultur sichtbar machen.
E · Deshalb sollten alle Besprechungen abgesagt werden.
F · Der ständige Wechsel neuer Inhalte beansprucht unsere Aufmerksamkeit weiter.
G · Dennoch arbeiten Menschen nachts grundsätzlich besser.
H · Eine offene Pausenkultur muss deshalb im ganzen Unternehmen gelten.`}),
    part('Teil 3', 'Lesen Sie den Artikel. Wählen Sie bei jeder Aufgabe a, b oder c.', 'Kann künstliche Intelligenz kreativ sein?', `Programme erzeugen inzwischen Bilder, Texte und Musik in wenigen Sekunden. Deshalb wird häufig gefragt, ob Maschinen kreativ sein können. Die Medienforscherin Dr. Neumann hält die Frage für zu einfach. Kreativität entstehe nicht nur im fertigen Werk, sondern auch in der Entscheidung, welches Problem gelöst werden soll und welche Wirkung beabsichtigt ist.

KI-Systeme erkennen Muster in großen Datenmengen und kombinieren sie neu. Das kann überraschende Ergebnisse liefern. Dennoch beurteilt ein Mensch, welche Variante interessant ist. Für Neumann wird Kreativität deshalb zunehmend zu einem Dialog zwischen Person und Werkzeug.

Problematisch ist, dass Trainingsdaten oft ohne ausreichende Transparenz gesammelt wurden. Kunstschaffende wissen nicht immer, ob ihre Werke verwendet wurden. Neumann fordert klare Regeln und Vergütungsmodelle, lehnt die Technologie aber nicht grundsätzlich ab. In Workshops beobachtet sie sogar, dass Anfänger schneller experimentieren, weil technische Hürden sinken. Entscheidend sei, Ergebnisse kritisch zu prüfen und nicht jede automatisch erzeugte Idee für originell zu halten.`, [
      q('b2-l-16','Warum hält Dr. Neumann die Ausgangsfrage für zu einfach?',['Weil KI keine Werke erzeugt.','Weil Kreativität mehr als das Ergebnis umfasst.','Weil nur Forschende kreativ sind.'],'Weil Kreativität mehr als das Ergebnis umfasst.','Why does Dr Neumann consider the initial question too simple?'),
      q('b2-l-17','Was leisten KI-Systeme laut Text?',['Sie verbinden gelernte Muster neu.','Sie bestimmen selbst gesellschaftliche Ziele.','Sie bewerten alle Ergebnisse objektiv.'],'Sie verbinden gelernte Muster neu.','What do AI systems do according to the text?'),
      q('b2-l-18','Welche Rolle bleibt beim Menschen?',['Er sammelt ausschließlich Daten.','Er wählt interessante Ergebnisse aus.','Er verhindert jede Überraschung.'],'Er wählt interessante Ergebnisse aus.','What role remains with the human?'),
      q('b2-l-19','Was kritisiert Neumann an Trainingsdaten?',['Ihre geringe Menge','Ihre technische Qualität','Die fehlende Transparenz ihrer Herkunft'],'Die fehlende Transparenz ihrer Herkunft','What does Neumann criticise about training data?'),
      q('b2-l-20','Welche Wirkung beobachtet sie bei Anfängern?',['Sie experimentieren leichter.','Sie vermeiden digitale Werkzeuge.','Sie kopieren nur bekannte Werke.'],'Sie experimentieren leichter.','What effect does she observe among beginners?'),
      q('b2-l-21','Welche Haltung vertritt die Forscherin insgesamt?',['vollständige Ablehnung','unkritische Begeisterung','offene, aber kritische Nutzung'],'offene, aber kritische Nutzung','What overall position does the researcher take?')
    ]),
    part('Teil 4', 'Welche Überschrift A–H passt zu welchem Text? Zwei Überschriften passen nicht.', 'Sechs Kurzmeldungen', `22 · Eine Kleinstadt verleiht Lastenräder kostenlos, wenn Einwohner damit Einkäufe statt mit dem Auto erledigen.
23 · Ein Orchester bietet vor Proben eine Stunde Kinderbetreuung an, damit mehr Eltern mitspielen können.
24 · Forschende testen Fenster, die im Sommer Sonnenlicht abweisen und im Winter Wärme speichern.
25 · Ein Kino zeigt einmal pro Woche Filme in Originalsprache und organisiert danach moderierte Gespräche.
26 · Mehrere Firmen lassen Beschäftigte vier Tage arbeiten, ohne das Monatsgehalt zu reduzieren.
27 · Ein Dorf hat seine leer stehende Schule in Wohnungen und Gemeinschaftsräume für mehrere Generationen umgebaut.`, [
      q('b2-l-22','Text 22',['A','B','C','D','E','F','G','H'],'E','Choose the heading for text 22.'),
      q('b2-l-23','Text 23',['A','B','C','D','E','F','G','H'],'B','Choose the heading for text 23.'),
      q('b2-l-24','Text 24',['A','B','C','D','E','F','G','H'],'G','Choose the heading for text 24.'),
      q('b2-l-25','Text 25',['A','B','C','D','E','F','G','H'],'C','Choose the heading for text 25.'),
      q('b2-l-26','Text 26',['A','B','C','D','E','F','G','H'],'A','Choose the heading for text 26.'),
      q('b2-l-27','Text 27',['A','B','C','D','E','F','G','H'],'F','Choose the heading for text 27.')
    ],{legend:`A · Kürzere Woche bei gleichem Lohn
B · Musikverein unterstützt Familien
C · Sprachlernen nach dem Abspann
D · Neue Regeln für private Autos
E · Einkaufen mit geliehenem Transportmittel
F · Gemeinsam wohnen im alten Klassenzimmer
G · Gebäude reagieren auf Jahreszeiten
H · Mehr Prüfungen an Schulen`}),
    part('Teil 5', 'Welche Regel passt zu welcher Situation?', 'Medienlabor · Regeln', `A · Geräte dürfen das Labor nur mit schriftlicher Genehmigung verlassen.
B · Reservierte Studios werden nach 15 Minuten an Wartende vergeben.
C · Persönliche Dateien sind nach der Nutzung vom Computer zu löschen.
D · Für Aufnahmen mit externen Gästen muss vorher eine Einverständniserklärung vorliegen.
E · Technische Defekte dürfen ausschließlich vom Laborteam behoben werden.`, [
      q('b2-l-28','Eine Studentin kommt zwanzig Minuten zu spät zu ihrem gebuchten Studio.',['A','B','C','D','E'],'B','A student arrives twenty minutes late for her booked studio.'),
      q('b2-l-29','Ein Mikrofon funktioniert plötzlich nicht mehr.',['A','B','C','D','E'],'E','A microphone suddenly stops working.'),
      q('b2-l-30','Ein Teilnehmer möchte eine Person von außerhalb interviewen.',['A','B','C','D','E'],'D','A participant wants to interview an external guest.')
    ])
  ];

  const b2ShortAudios = [
    {key:'b2-h-a1',text:'Ich lese Romane nicht, um dem Alltag zu entkommen. Im Gegenteil: Gute Literatur macht mich auf Details aufmerksam, die ich sonst übersehe. Allerdings brauche ich Ruhe, sonst verliere ich schnell den Faden.',truth:'Falsch',detail:'Sie nimmt alltägliche Details bewusster wahr.'},
    {key:'b2-h-a2',text:'Immer mehr Geschäfte akzeptieren kein Bargeld mehr. Das ist praktisch, kann aber ältere Menschen ausschließen. Deshalb sollte zumindest eine analoge Zahlungsmöglichkeit erhalten bleiben.',truth:'Richtig',detail:'Eine Zahlungsmöglichkeit ohne digitale Technik.'},
    {key:'b2-h-a3',text:'Während meines Praktikums beim Gericht durfte ich Verhandlungen beobachten, aber keine vertraulichen Akten lesen. Gerade diese klare Grenze fand ich professionell und lehrreich.',truth:'Richtig',detail:'Vertrauliche Akten lesen.'},
    {key:'b2-h-a4',text:'Unsere Gruppe sucht noch ein Thema für die Seminararbeit. Eine Präsentation halten wir erst im nächsten Semester. Mich interessiert, wie Computerspiele historische Ereignisse darstellen.',truth:'Falsch',detail:'eine Seminararbeit.'},
    {key:'b2-h-a5',text:'Viele glauben, dass ständige Erreichbarkeit die Zusammenarbeit verbessert. Unsere Daten zeigen das Gegenteil: Teams arbeiten konzentrierter, wenn Nachrichten nur zu festgelegten Zeiten beantwortet werden.',truth:'Richtig',detail:'Nachrichten zu festen Zeiten beantworten.'}
  ];
  const b2Listening1 = b2ShortAudios.flatMap((audio,index) => [
    q(`b2-h-${String(index*2+1).padStart(2,'0')}`,index===0?'Die Sprecherin liest vor allem zur Ablenkung.':index===1?'Der Sprecher sieht Nachteile einer rein digitalen Bezahlung.':index===2?'Die Sprecherin berichtet von einem Praktikum bei einem Gericht.':index===3?'Die Gruppe bereitet gerade eine Präsentation vor.':'Unbegrenzte Erreichbarkeit verbessert laut Daten die Konzentration.',tf,audio.truth,'Decide whether the statement matches the recording.',{audio:audio.text,audioKey:audio.key,repeats:1}),
    q(`b2-h-${String(index*2+2).padStart(2,'0')}`,index===0?'Welche Wirkung hat Literatur auf die Sprecherin?':index===1?'Was sollte nach Meinung des Sprechers erhalten bleiben?':index===2?'Was durfte die Praktikantin nicht tun?':index===3?'Was muss die Gruppe schreiben?':'Welche Maßnahme empfiehlt die Studie?',index===0?['Sie vergisst den Alltag.','Sie nimmt alltägliche Details bewusster wahr.','Sie kann bei Lärm besser denken.']:index===1?['Eine Zahlungsmöglichkeit ohne digitale Technik.','Ein Verbot von Bankkarten.','Ein Rabatt für ältere Menschen.']:index===2?['Verhandlungen beobachten.','Vertrauliche Akten lesen.','Fragen stellen.']:index===3?['einen Aufsatz.','eine Seminararbeit.','einen Roman.']:['Mehr Videokonferenzen.','Nachrichten zu festen Zeiten beantworten.','Private Handys verbieten.'],audio.detail,'Choose the correct detail.',{audio:audio.text,audioKey:audio.key,repeats:1})
  ]);
  const b2InterviewAudio = `Moderator: Frau Professor Klein, warum werden Städte im Sommer immer heißer? Klein: Dichte Bebauung speichert Wärme, während Pflanzen fehlen, die Wasser verdunsten lassen. Moderator: Helfen einzelne Bäume? Klein: Ja, aber entscheidend sind zusammenhängende grüne Flächen. Sie kühlen auch benachbarte Straßen. Moderator: Manche Städte streichen Dächer weiß. Klein: Helle Flächen reflektieren Sonnenlicht. Das ist günstig, löst aber nicht das gesamte Problem. Moderator: Was halten Sie von Klimaanlagen? Klein: Sie schützen einzelne Innenräume, geben jedoch Wärme nach außen ab und verbrauchen Strom. Moderator: Welche Maßnahme wirkt besonders schnell? Klein: Schatten an Haltestellen und Schulhöfen. Langfristig müssen wir Flächen entsiegeln, damit Regenwasser im Boden bleibt.`;
  const b2PanelAudio = `Moderator: Heute sprechen wir über lebenslanges Lernen. Frau Yilmaz: Weiterbildung sollte zur bezahlten Arbeitszeit gehören. Sonst können vor allem Menschen mit Familie kaum teilnehmen. Herr Roth: Betriebe müssen Angebote machen, aber Beschäftigte tragen ebenfalls Verantwortung. Nicht jeder Kurs ist für die Arbeit relevant. Frau Yilmaz: Gerade unerwartete Themen führen oft zu Innovation. Herr Roth: Trotzdem brauchen kleine Unternehmen Planungssicherheit. Moderator: Welche Rolle spielen Onlinekurse? Frau Yilmaz: Sie schaffen Flexibilität, aber ohne Austausch brechen viele ab. Herr Roth: Kurze digitale Einheiten lassen sich gut in den Alltag integrieren. Für komplexe Fähigkeiten bevorzuge ich Präsenz.`;
  const b2LectureAudio = `Guten Abend. Mein Vortrag beschäftigt sich mit der Frage, warum wir Geräusche unterschiedlich wahrnehmen. Lautstärke allein erklärt nicht, ob ein Klang als störend empfunden wird. Ebenso wichtig sind Erwartung, Kontrolle und Bedeutung. Das Rattern eines Zuges kann Reisende beruhigen, während ein leises, unbekanntes Summen im Schlafzimmer nervös macht. Studien zeigen außerdem, dass selbst gewählte Geräusche weniger belasten. Wer Musik einschaltet, erlebt dieselbe Lautstärke anders als eine Person, die unfreiwillig Musik aus der Nachbarwohnung hört. In der Stadtplanung reicht es deshalb nicht, nur Dezibel zu messen. Ruhige Rückzugsorte, verständliche Informationen über Bauarbeiten und zeitliche Regeln können die Belastung reduzieren. Vollständige Stille ist jedoch weder möglich noch immer wünschenswert. Auch positive Klänge, etwa Stimmen oder Naturgeräusche, gehören zu lebendigen Orten.`;
  const b2Listening = [
    part('Teil 1','Sie hören fünf Gespräche und Äußerungen. Jeden Text hören Sie einmal. Lösen Sie zu jedem Text zwei Aufgaben.','','',b2Listening1),
    part('Teil 2','Sie hören ein Interview zweimal. Wählen Sie bei jeder Aufgabe a, b oder c.','','',[
      q('b2-h-11','Warum heizen sich Städte besonders auf?',['Wärme wird gespeichert und Pflanzen fehlen.','Der Wind ist dort stärker.','Es regnet häufiger.'],'Wärme wird gespeichert und Pflanzen fehlen.','Why do cities heat up particularly strongly?'),
      q('b2-h-12','Was sagt die Expertin über einzelne Bäume?',['Sie sind wirkungslos.','Sie helfen, größere Grünflächen wirken aber umfassender.','Sie erhöhen die Temperatur.'],'Sie helfen, größere Grünflächen wirken aber umfassender.','What does the expert say about individual trees?'),
      q('b2-h-13','Welchen Vorteil haben helle Dächer?',['Sie speichern Regen.','Sie reflektieren Sonnenlicht.','Sie produzieren Strom.'],'Sie reflektieren Sonnenlicht.','What advantage do light-coloured roofs have?'),
      q('b2-h-14','Was kritisiert Klein an Klimaanlagen?',['Sie funktionieren nur nachts.','Sie geben Wärme nach außen ab.','Sie sind zu leise.'],'Sie geben Wärme nach außen ab.','What does Klein criticise about air conditioners?'),
      q('b2-h-15','Welche Maßnahme kann schnell helfen?',['Schatten an öffentlichen Orten','Neue Tiefgaragen','Breitere Straßen'],'Schatten an öffentlichen Orten','Which measure can help quickly?'),
      q('b2-h-16','Was ist langfristig notwendig?',['Mehr versiegelte Flächen','Regenwasser schneller ableiten','Boden wieder wasserdurchlässig machen'],'Boden wieder wasserdurchlässig machen','What is necessary in the long term?')
    ],{audio:b2InterviewAudio,audioKey:'b2-h-interview',repeats:2}),
    part('Teil 3','Sie hören eine Diskussion einmal. Wer sagt das?','','',[
      q('b2-h-17','Weiterbildung sollte während bezahlter Arbeitszeit möglich sein.',['Moderator','Frau Yilmaz','Herr Roth'],'Frau Yilmaz','Who says further training should be possible during paid working hours?'),
      q('b2-h-18','Auch Beschäftigte selbst sind für ihre Weiterbildung verantwortlich.',['Moderator','Frau Yilmaz','Herr Roth'],'Herr Roth','Who says employees also bear responsibility for further training?'),
      q('b2-h-19','Ungewöhnliche Themen können neue Ideen auslösen.',['Moderator','Frau Yilmaz','Herr Roth'],'Frau Yilmaz','Who says unexpected topics can trigger new ideas?'),
      q('b2-h-20','Kleine Unternehmen brauchen verlässliche Planung.',['Moderator','Frau Yilmaz','Herr Roth'],'Herr Roth','Who says small companies need reliable planning?'),
      q('b2-h-21','Bei Onlinekursen fehlt häufig der persönliche Austausch.',['Moderator','Frau Yilmaz','Herr Roth'],'Frau Yilmaz','Who says online courses often lack personal exchange?'),
      q('b2-h-22','Für anspruchsvolle Fähigkeiten ist Präsenzunterricht besser.',['Moderator','Frau Yilmaz','Herr Roth'],'Herr Roth','Who prefers in-person learning for complex skills?')
    ],{audio:b2PanelAudio,audioKey:'b2-h-panel',repeats:1}),
    part('Teil 4','Sie hören einen Vortrag zweimal. Wählen Sie bei jeder Aufgabe a, b oder c.','','',[
      q('b2-h-23','Wovon hängt die Störung durch Geräusche ab?',['Nur von der Lautstärke','Auch von Erwartung und Bedeutung','Nur von der Tageszeit'],'Auch von Erwartung und Bedeutung','What influences how disturbing sounds are?'),
      q('b2-h-24','Warum kann Zugrattern beruhigen?',['Weil es erwartet wird.','Weil es völlig leise ist.','Weil es Musik ähnelt.'],'Weil es erwartet wird.','Why can the rattling of a train be calming?'),
      q('b2-h-25','Wie wirken selbst gewählte Geräusche?',['Meist belastender','Weniger belastend','Immer unhörbar'],'Weniger belastend','How do self-selected sounds affect people?'),
      q('b2-h-26','Welches Beispiel zeigt fehlende Kontrolle?',['Eigene Kopfhörermusik','Musik aus der Nachbarwohnung','Vogelstimmen im Park'],'Musik aus der Nachbarwohnung','Which example demonstrates a lack of control?'),
      q('b2-h-27','Was reicht in der Stadtplanung nicht aus?',['Dezibel zu messen','Rückzugsorte anzubieten','Bauzeiten zu erklären'],'Dezibel zu messen','What is not sufficient in urban planning?'),
      q('b2-h-28','Was kann Belastung durch Bauarbeiten reduzieren?',['Unklare Zeitpläne','Verständliche Informationen','Mehr Verkehr'],'Verständliche Informationen','What can reduce the burden caused by construction work?'),
      q('b2-h-29','Wie bewertet der Redner vollständige Stille?',['Sie ist überall notwendig.','Sie ist unmöglich und nicht immer erwünscht.','Sie ist in Städten leicht erreichbar.'],'Sie ist unmöglich und nicht immer erwünscht.','How does the speaker assess complete silence?'),
      q('b2-h-30','Was gehört laut Vortrag zu lebendigen Orten?',['Nur technische Geräusche','Auch Stimmen und Naturklänge','Ausschließlich Stille'],'Auch Stimmen und Naturklänge','What belongs to lively places according to the talk?')
    ],{audio:b2LectureAudio,audioKey:'b2-h-lecture',repeats:2})
  ];

  const writing = {
    B1:[
      {title:'Aufgabe 1 · Persönliche E-Mail',words:80,prompt:`Sie haben am Wochenende einen Workshop für elektronische Musik besucht. Schreiben Sie Ihrem Freund Daniel.

• Beschreiben Sie den Workshop.
• Begründen Sie, warum er Ihnen gefallen oder nicht gefallen hat.
• Schlagen Sie vor, gemeinsam einen weiteren Kurs zu besuchen.`,en:'Write a personal email about an electronic-music workshop: describe it, explain your opinion and suggest attending another course together.',rubric:['称呼和结尾符合私人邮件','覆盖三个内容点','说明理由并提出具体建议','使用连接词，约 80 词']},
      {title:'Aufgabe 2 · Forumsbeitrag',words:80,prompt:`Sie haben im Internet einen Beitrag zum Thema „Sollten Innenstädte autofrei werden?“ gelesen. Schreiben Sie Ihre Meinung.

• Nennen Sie Gründe für Ihre Meinung.
• Geben Sie ein Beispiel aus Ihrem Alltag.
• Gehen Sie kurz auf eine andere Meinung ein.`,en:'Write a forum post on whether city centres should become car-free, with reasons, an example and a response to another view.',rubric:['观点清楚','至少两个理由','包含个人例子','回应相反观点，约 80 词']},
      {title:'Aufgabe 3 · Formelle E-Mail',words:40,prompt:`Sie können morgen nicht zu Ihrem Deutschkurs kommen, weil Sie einen wichtigen Termin haben. Schreiben Sie an Ihre Kursleiterin Frau Berger.

• Entschuldigen Sie sich.
• Erklären Sie kurz den Grund.
• Bitten Sie um die Hausaufgaben.`,en:'Write a formal email apologising for missing class, explain why and ask for the homework.',rubric:['正式称呼','道歉并简述原因','礼貌提出请求','正式结尾，约 40 词']}
    ],
    B2:[
      {title:'Teil 1 · Forumsbeitrag',words:150,prompt:`Sie schreiben einen Forumsbeitrag zum Thema „Künstliche Intelligenz im Unterricht“.

• Äußern Sie Ihre Meinung zum Einsatz von KI.
• Nennen Sie Gründe, warum Lernende solche Werkzeuge nutzen.
• Nennen Sie mögliche Probleme.
• Schlagen Sie Regeln für einen sinnvollen Einsatz vor.`,en:'Write a 150-word forum post about AI in education: state your opinion, reasons for use, possible problems and sensible rules.',rubric:['清晰表达立场','完整覆盖四个内容点','论证包含优缺点与例子','结构清楚、衔接自然，约 150 词']},
      {title:'Teil 2 · Formelle Nachricht',words:100,prompt:`Sie arbeiten in einem Kulturzentrum. Wegen einer Erkrankung können Sie eine geplante Veranstaltung nicht moderieren. Schreiben Sie an Ihre Vorgesetzte Frau Lorenz.

• Erklären Sie die Situation.
• Bitten Sie um Verständnis.
• Machen Sie einen Vorschlag für eine Vertretung.
• Bieten Sie Hilfe bei der Vorbereitung an.`,en:'Write a 100-word formal message explaining that you cannot moderate an event, ask for understanding, suggest a replacement and offer preparation help.',rubric:['正式语域一致','完整说明情况和请求','提出可执行的替代方案','句型与词汇达到 B2，约 100 词']}
    ]
  };

  const speaking = {
    B1:[
      {title:'Teil 1 · Gemeinsam etwas planen',prompt:'Sie möchten mit Ihrer Gesprächspartnerin / Ihrem Gesprächspartner für den Deutschkurs einen internationalen Abend organisieren.',points:['Wann und wo?','Essen und Getränke?','Musik oder Programm?','Wer übernimmt welche Aufgabe?'],en:'Plan an international evening together: time/place, food, programme and responsibilities.'},
      {title:'Teil 2 · Ein Thema präsentieren',prompt:'Thema: Lernen mit Apps',points:['Stellen Sie Ihr Thema vor.','Berichten Sie von Ihrer persönlichen Erfahrung.','Beschreiben Sie die Situation in Ihrem Heimatland.','Nennen Sie Vor- und Nachteile und Ihre Meinung.','Beenden Sie Ihre Präsentation und bedanken Sie sich.'],en:'Give a presentation about learning with apps: experience, situation in your country, pros/cons and opinion.'},
      {title:'Teil 3 · Feedback und Fragen',prompt:'Reagieren Sie auf die Präsentation Ihrer Gesprächspartnerin / Ihres Gesprächspartners.',points:['Geben Sie freundliches Feedback.','Stellen Sie eine inhaltliche Frage.','Beantworten Sie eine Rückfrage zu Ihrer Präsentation.'],en:'Respond to your partner’s presentation with feedback, a question and an answer.'}
    ],
    B2:[
      {title:'Teil 1 · Vortrag und Nachfragen',prompt:'Wählen Sie ein Thema und halten Sie einen kurzen Vortrag: A) Sollte Kultur kostenlos sein? oder B) Welche Rolle spielt Musik im Alltag?',points:['Stellen Sie mehrere Möglichkeiten dar.','Nennen Sie Vor- und Nachteile.','Bewerten Sie die Möglichkeiten.','Beschreiben Sie eine Möglichkeit genauer.','Reagieren Sie anschließend auf Nachfragen.'],en:'Give a short talk on free culture or music in everyday life, compare options and answer follow-up questions.'},
      {title:'Teil 2 · Diskussion',prompt:'Diskutieren Sie: Sollten Unternehmen eine Vier-Tage-Woche einführen?',points:['Vertreten Sie eine Position argumentativ.','Reagieren Sie direkt auf Gegenargumente.','Nennen Sie konkrete Beispiele.','Fassen Sie am Ende zusammen: dafür oder dagegen?'],en:'Discuss whether companies should introduce a four-day week, respond to counterarguments and conclude.'}
    ]
  };

  [10,20,10,15,10].forEach((minutes,index) => { b1Reading[index].minutes = minutes; });
  [18,12,12,12,6].forEach((minutes,index) => { b2Reading[index].minutes = minutes; });
  [20,25,15].forEach((minutes,index) => { writing.B1[index].minutes = minutes; });
  [50,25].forEach((minutes,index) => { writing.B2[index].minutes = minutes; });
  [3,3,3].forEach((minutes,index) => { speaking.B1[index].minutes = minutes; });
  [4,5].forEach((minutes,index) => { speaking.B2[index].minutes = minutes; });

  const EXAMS = {
    B1:{level:'B1',pass:60,modules:{lesen:{label:'LESEN',minutes:65,parts:b1Reading},hoeren:{label:'HÖREN',minutes:40,parts:b1Listening},schreiben:{label:'SCHREIBEN',minutes:60,tasks:writing.B1},sprechen:{label:'SPRECHEN',minutes:15,prep:15,tasks:speaking.B1}}},
    B2:{level:'B2',pass:60,modules:{lesen:{label:'LESEN',minutes:65,parts:b2Reading},hoeren:{label:'HÖREN',minutes:40,parts:b2Listening},schreiben:{label:'SCHREIBEN',minutes:75,tasks:writing.B2},sprechen:{label:'SPRECHEN',minutes:15,prep:15,tasks:speaking.B2}}}
  };

  const moduleDescriptions = {
    lesen:'阅读多种文本并提取主旨、细节、观点与规则。',
    hoeren:'听日常对话、采访、讨论和短讲并完成选择题。',
    schreiben:'按照正式题型完成开放写作，保存于本机。',
    sprechen:'按真实任务准备陈述、协商与讨论。'
  };
  const STORAGE_KEY = 'mein-deutsch-goethe-results-v1';
  let state = null;

  function escapeHtml(value='') {
    return String(value).replace(/[&<>"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[character]));
  }
  function loadResults() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
  }
  function saveResult(level,module,result) {
    const results = loadResults();
    results[`${level}-${module}`] = {...result,date:new Date().toISOString()};
    localStorage.setItem(STORAGE_KEY,JSON.stringify(results));
  }
  function flattenQuestions(module) {
    return module.parts.flatMap((currentPart,partIndex) => currentPart.questions.map((question,index) => ({...question,partIndex,indexInPart:index})));
  }
  function formatTime(seconds) {
    const safe = Math.max(0,seconds);
    return `${String(Math.floor(safe/60)).padStart(2,'0')}:${String(safe%60).padStart(2,'0')}`;
  }
  function stopTimer() {
    if (state?.timerId) clearInterval(state.timerId);
    window.offlineGermanAudio?.stop();
  }
  function startTimer() {
    stopTimer();
    state.timerId = setInterval(() => {
      state.secondsLeft -= 1;
      $g('#goetheExamTimer').textContent = formatTime(state.secondsLeft);
      if (state.secondsLeft <= 0) {
        if (state.phase === 'prep') beginSpeakingExam();
        else finishModule(true);
      }
    },1000);
  }
  function updateShell(total,index) {
    $g('#goetheExamLevel').textContent = state.level;
    $g('#goetheExamModule').textContent = state.module === 'overview'
      ? 'PRÜFUNGSÜBERSICHT'
      : `${EXAMS[state.level].modules[state.module].label}${state.phase === 'prep' ? ' · VORBEREITUNG' : ''}`;
    $g('#goetheExamTimer').textContent = state.module === 'overview' ? '—' : formatTime(state.secondsLeft);
    $g('#goetheExamProgress').style.width = total ? `${((index+1)/total)*100}%` : '0%';
    $g('#goetheExamPosition').textContent = total ? `${index+1} / ${total}` : '4 MODULE';
  }
  function openExam(level,module) {
    stopTimer();
    document.body.classList.add('training-active');
    $g('#goetheExam').hidden = false;
    state = {level,module,index:0,answers:{},drafts:{},audioPlays:{},audioLoadingKey:null,secondsLeft:0,timerId:null,finished:false,phase:'exam'};
    if (module === 'overview') {
      renderOverview();
      return;
    }
    const config = EXAMS[level].modules[module];
    if (module === 'sprechen' && config.prep) state.phase = 'prep';
    state.secondsLeft = (state.phase === 'prep' ? config.prep : config.minutes) * 60;
    if (config.parts) state.questions = flattenQuestions(config);
    startTimer();
    renderCurrent();
  }
  function renderOverview() {
    const level = EXAMS[state.level];
    const results = loadResults();
    const cards = Object.entries(level.modules).map(([key,module]) => {
      const result = results[`${state.level}-${key}`];
      const resultText = result ? (typeof result.score === 'number' ? `上次 ${result.score} 分` : '上次已完成') : '尚未模拟';
      const detail = module.parts ? `${module.parts.length} Teile · ${flattenQuestions(module).length} 题` : `${module.tasks.length} Aufgaben`;
      return `<article class="goethe-overview-module"><span>${module.label} · ${resultText}</span><b>${detail}</b><time>${module.minutes} Min.</time><p>${moduleDescriptions[key]}</p><button class="goethe-start-module" data-overview-start="${key}">开始这个模块 →</button></article>`;
    }).join('');
    $g('#goetheExamMain').innerHTML = `<div class="goethe-overview-head"><div><span>GOETHE-ZERTIFIKAT · ERWACHSENE</span><h2>${state.level} 模拟考试</h2></div><p>四个模块可独立完成。每个模块满分 100，达到 60 分为通过；写作与口语需按清单自行复核。</p></div><div class="goethe-overview-grid">${cards}</div><details class="goethe-assist"><summary>考试规则 · Exam rules</summary><p>正式模拟时不要打开中英辅助，不使用词典或其他工具。听力播放次数按照每个 Teil 的规则限制。口语准备时间为 15 分钟。</p></details>`;
    $g('#goethePrevious').hidden = true;
    $g('#goetheNext').hidden = true;
    updateShell(0,0);
  }
  function renderCurrent() {
    const config = EXAMS[state.level].modules[state.module];
    $g('#goethePrevious').hidden = false;
    $g('#goetheNext').hidden = false;
    if (config.parts) renderQuestion(config);
    else renderProduction(config);
  }
  function renderQuestion(config) {
    const question = state.questions[state.index];
    const currentPart = config.parts[question.partIndex];
    const selected = state.answers[question.id];
    const sourceLegend = currentPart.legend ? `<pre>${escapeHtml(currentPart.legend)}</pre>` : '';
    const source = currentPart.source || currentPart.legend ? `<section class="goethe-source">${currentPart.sourceTitle ? `<h3>${escapeHtml(currentPart.sourceTitle)}</h3>` : ''}${currentPart.source ? `<p>${escapeHtml(currentPart.source)}</p>` : ''}${sourceLegend}</section>` : '';
    const audioText = question.audio || currentPart.audio;
    const audioKey = question.audioKey || currentPart.audioKey;
    const repeats = question.repeats || currentPart.repeats || 1;
    const used = state.audioPlays[audioKey] || 0;
    const loading = state.audioLoadingKey === audioKey;
    const audio = audioText ? `<div class="goethe-audio"><button data-play-goethe="${escapeHtml(audioKey)}" ${used>=repeats||loading?'disabled':''}>${loading?'正在加载…':'◖ 录音播放'}</button><span>${loading?'加载成功后才计次数 · ':''}允许播放 ${repeats} 次 · 已播放 ${used} 次</span></div>` : '';
    const choices = question.options.map((option,index) => `<button class="goethe-choice ${selected===option?'selected':''}" data-goethe-answer="${escapeHtml(option)}"><i>${String.fromCharCode(97+index)}</i><span>${escapeHtml(option)}</span></button>`).join('');
    const timing = currentPart.minutes ? `${currentPart.minutes} MIN. EMPFOHLEN · ${config.minutes} MIN. GESAMT` : `${config.minutes} MINUTEN`;
    $g('#goetheExamMain').innerHTML = `<div class="goethe-question-head"><div><span class="goethe-part-label">${currentPart.title} · AUFGABE ${state.index+1}</span><span>${timing}</span></div><h2>${escapeHtml(currentPart.instruction)}</h2></div>${source}${audio}<p class="goethe-question">${escapeHtml(question.prompt)}</p><div class="goethe-choices">${choices}</div><details class="goethe-assist"><summary>EN · practice support</summary><p>${escapeHtml(question.en)}</p>${audioText?`<p><b>Transcript:</b> ${escapeHtml(audioText)}</p>`:''}</details>`;
    $g('#goethePrevious').disabled = state.index === 0;
    $g('#goetheNext').textContent = state.index === state.questions.length-1 ? '交卷 →' : '下一题 →';
    updateShell(state.questions.length,state.index);
  }
  function renderProduction(config) {
    const task = config.tasks[state.index];
    const isWriting = state.module === 'schreiben';
    const saved = state.drafts[state.index] || '';
    const rubric = (task.rubric || []).map(item => `<label><input type="checkbox"><span>${escapeHtml(item)}</span></label>`).join('');
    const points = (task.points || []).map(item => `<span>${escapeHtml(item)}</span>`).join('');
    const workArea = isWriting
      ? `<textarea id="goetheDraft" placeholder="在这里用德语作答……">${escapeHtml(saved)}</textarea><div class="goethe-word-count"><b id="goetheWordCount">0</b> Wörter · Ziel ca. ${task.words}</div><details class="goethe-rubric"><summary>完成后自评清单</summary>${rubric}</details>`
      : `<div class="goethe-speaking-points">${points}</div><div class="goethe-speak-control"><button data-speak-goethe="${escapeHtml(task.prompt)}">◖ 听题目</button>${state.phase==='prep'?'<button data-start-speaking>提前结束准备，开始口试</button>':''}</div>`;
    const phaseLabel = state.phase === 'prep'
      ? `VORBEREITUNG · ${config.prep} MINUTEN`
      : `${task.minutes ? `${task.minutes} MIN. EMPFOHLEN · ` : ''}${config.minutes} MIN. GESAMT`;
    $g('#goetheExamMain').innerHTML = `<div class="goethe-question-head"><div><span class="goethe-part-label">${task.title}</span><span>${phaseLabel}</span></div><h2>${isWriting?'Schreiben Sie Ihren Text.':state.phase==='prep'?'Lesen Sie die Aufgaben und machen Sie Notizen.':'Sprechen Sie frei und strukturiert.'}</h2></div><article class="goethe-production-card"><h3>${escapeHtml(task.prompt)}</h3>${workArea}<details class="goethe-assist"><summary>EN · practice support</summary><p>${escapeHtml(task.en)}</p></details></article>`;
    if (isWriting) {
      const area = $g('#goetheDraft');
      const refreshCount = () => { state.drafts[state.index]=area.value; $g('#goetheWordCount').textContent=(area.value.trim().match(/\S+/g)||[]).length; };
      area.addEventListener('input',refreshCount);
      refreshCount();
    }
    $g('#goethePrevious').disabled = state.index === 0;
    $g('#goetheNext').textContent = state.index === config.tasks.length-1
      ? (state.phase === 'prep' ? '开始口试 →' : '完成模块 →')
      : '下一题 →';
    updateShell(config.tasks.length,state.index);
  }
  function selectAnswer(value) {
    const question = state.questions[state.index];
    state.answers[question.id] = value;
    renderCurrent();
  }
  async function playAudio(key) {
    const config = EXAMS[state.level].modules[state.module];
    const question = state.questions[state.index];
    const currentPart = config.parts[question.partIndex];
    const audioKey = question.audioKey || currentPart.audioKey;
    if (key !== audioKey) return;
    const repeats = question.repeats || currentPart.repeats || 1;
    const used = state.audioPlays[audioKey] || 0;
    const text = question.audio || currentPart.audio;
    if (used >= repeats || state.audioLoadingKey || !window.offlineGermanAudio?.has(text)) return;
    const currentState = state;
    state.audioLoadingKey = audioKey;
    renderCurrent();
    try {
      await window.offlineGermanAudio.play(text);
      if (state !== currentState) return;
      state.audioPlays[audioKey] = used + 1;
    } catch (error) {
      console.warn(error.message);
    } finally {
      if (state === currentState) {
        state.audioLoadingKey = null;
        renderCurrent();
      }
    }
  }
  function next() {
    const config = EXAMS[state.level].modules[state.module];
    const total = config.parts ? state.questions.length : config.tasks.length;
    if (state.index >= total-1) {
      if (state.module === 'sprechen' && state.phase === 'prep') beginSpeakingExam();
      else finishModule(false);
      return;
    }
    state.index += 1;
    renderCurrent();
    $g('#goetheExamMain').scrollTop = 0;
  }
  function previous() {
    if (state.index === 0) return;
    state.index -= 1;
    renderCurrent();
    $g('#goetheExamMain').scrollTop = 0;
  }
  function beginSpeakingExam() {
    if (!state || state.module !== 'sprechen' || state.phase !== 'prep') return;
    stopTimer();
    const config = EXAMS[state.level].modules.sprechen;
    state.phase = 'exam';
    state.index = 0;
    state.secondsLeft = config.minutes * 60;
    startTimer();
    renderCurrent();
    $g('#goetheExamMain').scrollTop = 0;
  }
  function finishModule(timeExpired) {
    if (!state || state.finished) return;
    state.finished = true;
    stopTimer();
    const config = EXAMS[state.level].modules[state.module];
    let body;
    if (config.parts) {
      const correct = state.questions.filter(question => state.answers[question.id] === question.answer).length;
      const answered = Object.keys(state.answers).length;
      const score = Math.round(correct / state.questions.length * 100);
      const passed = score >= EXAMS[state.level].pass;
      saveResult(state.level,state.module,{score,correct,total:state.questions.length,answered});
      body = `<div class="goethe-result"><div class="score-ring"><b>${score}</b><span>PUNKTE / 100</span></div><p class="eyebrow">${state.level} · ${config.label}</p><h2>${passed?'模块通过':'还需要继续练习'}</h2><p>${correct} / ${state.questions.length} 题正确 · ${answered} 题已作答${timeExpired?' · 时间已到':''}<br>歌德模块及格线：60 分</p><div class="goethe-result-actions"><button class="primary" data-restart-goethe>再做一次</button><button data-goethe-overview>返回 ${state.level} 总览</button><button data-close-goethe>退出</button></div></div>`;
    } else {
      const completed = state.module === 'schreiben' ? Object.values(state.drafts).filter(value => value.trim()).length : config.tasks.length;
      saveResult(state.level,state.module,{completed,total:config.tasks.length});
      body = `<div class="goethe-result"><div class="score-ring"><b>✓</b><span>MODUL BEENDET</span></div><p class="eyebrow">${state.level} · ${config.label}</p><h2>模拟任务已完成</h2><p>${state.module==='schreiben'?`已作答 ${completed} / ${config.tasks.length} 个写作任务。草稿只保存在当前考试过程中；请根据每题清单复核。`:'口语是开放考试，需要搭档或教师按歌德标准评分。请回顾是否覆盖全部要点、表达连贯并能回应对方。'}${timeExpired?'<br>时间已到。':''}</p><div class="goethe-result-actions"><button class="primary" data-restart-goethe>再做一次</button><button data-goethe-overview>返回 ${state.level} 总览</button><button data-close-goethe>退出</button></div></div>`;
    }
    $g('#goetheExamMain').innerHTML = body;
    $g('#goethePrevious').hidden = true;
    $g('#goetheNext').hidden = true;
    $g('#goetheExamPosition').textContent = 'ERGEBNIS';
    $g('#goetheExamProgress').style.width = '100%';
  }
  function closeExam(force=false) {
    if (!force && state && !state.finished && state.module !== 'overview' && !window.confirm('退出后，本次模拟考试的作答不会保留。确定退出吗？')) return;
    stopTimer();
    state = null;
    $g('#goetheExam').hidden = true;
    document.body.classList.remove('training-active');
  }

  document.addEventListener('click',event => {
    const start = event.target.closest('[data-goethe-level][data-goethe-module]');
    if (start) { openExam(start.dataset.goetheLevel,start.dataset.goetheModule); return; }
    const overviewStart = event.target.closest('[data-overview-start]');
    if (overviewStart && state) { openExam(state.level,overviewStart.dataset.overviewStart); return; }
    const answer = event.target.closest('[data-goethe-answer]');
    if (answer && state) { selectAnswer(answer.dataset.goetheAnswer); return; }
    const play = event.target.closest('[data-play-goethe]');
    if (play && state) { playAudio(play.dataset.playGoethe); return; }
    const speakPrompt = event.target.closest('[data-speak-goethe]');
    if (speakPrompt) { window.offlineGermanAudio?.play(speakPrompt.dataset.speakGoethe).catch(error => console.warn(error.message)); return; }
    if (event.target.closest('[data-start-speaking]')) { beginSpeakingExam(); return; }
    if (event.target.closest('[data-restart-goethe]') && state) { openExam(state.level,state.module); return; }
    if (event.target.closest('[data-goethe-overview]') && state) { openExam(state.level,'overview'); return; }
    if (event.target.closest('[data-close-goethe]')) closeExam(true);
  });
  $g('#goetheNext').addEventListener('click',next);
  $g('#goethePrevious').addEventListener('click',previous);
  $g('#exitGoetheExam').addEventListener('click',() => closeExam(false));
  document.addEventListener('keydown',event => {
    if (!$g('#goetheExam').hidden && event.key === 'Escape') closeExam(false);
  });

  window.__GOETHE_EXAMS__ = EXAMS;
})();
