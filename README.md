## AniMenu!

Welcome to [AniMenu](https://animenu.vercel.app/)! Thanks for stopping by. If you'd like to connect here's my [LinkedIn](https://www.linkedin.com/in/michaelquintdev/) as well as [Email](mailto:michaelquintdev@gmail.com)

Known bugs / problems:
 - ListEntry component is unnecessarily complex and causes bugs to state involving posts, deletes, and updates.
 - After getting an error trying to add an anime to your list, delete and update can sometimes not work with correct anime.
 - Frontend reaches out to backend and Kitsu API separately, causing problem with scalability and makes state management a lot more difficult. 
 - Friend functionality is setup on backend but not on the frontend


Fixed:
 - Rate limiting problem from Kitsu API causes dashboard to not load upon login depending on how many animes you have on your list
 - Update form doesn't have validation 
 - When selecting the edit button on a card, all cards would enable editing and editing a different card after that point wouldn't work.
