# DOPO

> DOPO ist eine kleine Web Anwendung zur Notenberechnung der Master Studiengänge
 Informatik an der FH Dortmund. Die Berechnung ist komplett lokal, d.h. es
 werden keine Noten an einen Server gesendet.

Eine funktionsfähige Installation findet sich u.a. hier:

<a href="http://www.zielke.it/dopo/">FH Dortmund Master Informatik
 Notenberechnung</a>

## Features

- Automatische Berechnung von Modul- und Endnoten

- Automatisches Einsortieren von Prüfungen in die passenden Module

- Nachträgliches Bearbeiten von Prüfungsergebnissen 

- Einfaches Umschalten zwischen Prüfungsordnungen, um zu vergleichen, ob sich
 ein PO Wechsel lohnt


## Anleitung

Vorher: In ODS einloggen und den Notenspiegel aufrufen.

1. Die komplette Notentabelle aus ODS kopieren und in das 1. Textfeld einfügen.
 Der Inhalt sollte dann automatisch tab-getrennt sein.
 
2. Prüfungsordnung auswählen

3. Notenblatt laden


## Prüfungsordnungen hinzufügen oder ändern

*Es muss hierfür nichts am Javascript Code verändert werden!*

Die Verwaltung der Prüfungsordnungen ist per JSON realisiert. Die folgenden
 Dateien sind dafür relevant:
 
    data/pos.json
    =============
    
Hier sind die Namen der Prüfungsordnungen zur Auswahl hinterlegt.

    data/<Name>.json
    ================
    
Diese Datei beinhaltet alle relevanten Informationen zur jeweiligen PO und den
 Modulprüfungen. Vorhandene Prüfungsordnungen müssen hier geändert werden, z.B.
 um eine Modulprüfung hinzuzufügen.

Eine neue PO kann durch Erstellen einer neuen JSON Datei hinzugefügt werden.
 Die Bezeichnung der jeweiligen PO muss dann noch in die *pos.json* übernommen
 werden.


## Betrieb vom Dateisystem aus

Die Sicherheitseinstellungen der gängigen Browser verhindern, dass Dateien aus
 dem Dateisystem nachgeladen werden.

Um die Anwendung trotzdem vom Dateisystem aus zu starten, müssen diese
 Einstellungen deaktiviert werden. Zum Beispiel muss Chrome dazu folgendermaßen
 aufgerufen werden:

    chrome --allow-file-access-from-files --disable-web-security

Mit diesen Einstellungen sollte man aus Sicherheitsgründen keine Webseiten
 besuchen. 


## TODOs

- Gegebenenfalls Rundungsdifferenzen berücksichtigen. Bis jetzt werden erst
 Pflichtmodule aufgefüllt und danach die Wahlmodule.
  
- Persistente Speicherung der Daten über HTML5 Web Storage

- Main View entzerren und Code Cleanups, siehe u.a. TODO Markierungen im Code


## Sonstiges

DOPO basiert auf <a href="https://github.com/tastejs/todomvc">TodoMVC</a>


# Entwickler und Mitwirkende

Björn Zielke

*"Forks and pull requests welcome"*

## Lizenz

MIT License. Siehe LICENSE.txt.