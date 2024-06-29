To-Do Liste mit React Native und Web-API

Aufgabe:
Erstellen Sie eine React Native App und eine Webapplikation (nur Endpoints, also ein API Host), die folgende Funktionalitäten bietet:

To-Do-Liste: Der Benutzer soll To-Dos als Liste erstellen und speichern können.
Speicherung auf dem Server: Die erstellten To-Dos sollen über einen Endpoint auf dem Server gespeichert werden.
Laden der Vorlagen: Beim öffnen der App werden die gespeicherten To-Dos geladen und in der App angezeigt.
Anforderungen:

1. Backend (API Host)
Erstellen Sie eine einfache API mit ASP.NET Core und Entity Framework Core mit folgenden Endpoints:

- POST /todos: Zum Speichern einer neuen To-Do-Liste.
- GET /todos: Zum Laden der gespeicherten To-Dos.

2. Frontend (React Native App)
Erstellen Sie eine React Native App mit folgenden Komponenten:

- LoginScreen: Ermöglicht die Anmeldung des Benutzers.
- TodoListOverview: Zeigt bereits angelegten ToDo Listen an.
- TodoListScreen: Zeigt die To-Do-Liste an und ermöglicht das Hinzufügen/Entfernen/Bearbeiten der To-Dos.