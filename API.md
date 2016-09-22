# Metody API

wymagane przakazanie user_id w getach i postach

## GET /tasks/ID

Zwraca wybranego w ID taska.

## GET /tasks/scheduled?user_id=1

Zwraca listę tasków

## POST /tasks

Parametry:
- content (string): zawartość taska
- flagged (bool): informacja o tym, czy task ma być wyróżniony
- user_id (string/int): id uzytkownika

## GET /tasks/with_stars?user_id=1

Zwraca listę tasków zaznaczonych gwiazdką

## GET /tasks/:id/star?user_id=1

Ustawia status "oflagowany" dla tasks o `:id`

## GET /tasks/:id/unstar?user_id=1

Wyłącza status "oflagowany" dla tasks o `:id`

## GET /tasks/:id/check?user_id=1

Ustawia status "done" na `true` dla taska o `:id` (oznacza zadanie jako zakończone).

## GET /tasks/:id/uncheck?user_id=1

Ustawia status "done" na `false` dla taska o `:id` (oznacza zadanie jako zakończone).

## GET /projects?user_id=1

Zwraca listę projektów.

## POST /projects

Tworzy projekt - folder. Parametry:
- name (string): Nazwa projektu
- color (string): kolor "kwadracika" przy projekcie (przyjmuje dowolnego stringa).
- user_id (string/int): id uzytkownika

## DELETE /projects/:id

Usuwa projekt o danym `:id`.

## GET /projects/:id/tasks?user_id=1

Zwraca listę tasków w projekcie o `:id`
