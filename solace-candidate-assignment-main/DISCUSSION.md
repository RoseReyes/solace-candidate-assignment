# Advocate Specialties

1. i chose not to use a database to make the most of the 2-hour time limit.
   In a real-world scenario, each object would have a unique ID, which should be used as the key prop value instead of relying on the array index.

2. specialties: jsonb('payload').notNull().default([]).$type<string[]>(), not sure if this is the best way to handle type unknown specifically using drizzle (not familiar with it), fixed it because the red squiggly is annoying :)

# Schema Changes

phoneNumber - Use text instead of bigint to preserve formatting and precision
specialties - Rename for clarity or normalize into separate table
createdAt - Add .notNull()
updatedAt - Add for future auditability
email/slug - Optional but helpful for unique identification/search

# Future Enhancements

1. create test files

2. create a nice error message UI so that the user will have a good experience even if something went wrong

3. add another message for no yield results when filtering

4. break down components (header, input, results)

5. add auto-complete when filtering/searching terms

6. proper loading and error message display for the users

7. voice search

8. add more styling to the page
