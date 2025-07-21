# Advocate Specialties

1. i chose not to use a database to make the most of the 2-hour time limit.
   In a real-world scenario, each object would have a unique ID, which should be used as the key prop value instead of relying on the array index.

2. specialties: jsonb('payload').notNull().default([]).$type<string[]>(), not sure if this is the best way to handle type unknown specifically using drizzle (not familiar with it), fixed it because the red squiggly is annoying :)

# Future Enhancements

1. create test files

2. create a nice error message UI so that the user will have a good experience even if something went wrong

3. add another message for no yield results when filtering

4. create a separate component for the header and the results table

5. add auto-complete when filtering/searching terms

6. access previous search results

7. voice search
