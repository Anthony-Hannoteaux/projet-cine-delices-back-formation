BEGIN;


INSERT INTO "movie"("TMDB_id", "title", "overview", "poster_path", "media_type") VALUES
(
    574475,
    'Final Destination Bloodlines',
    'Plagued by a violent recurring nightmare, college student Stefanie heads home to track down the one person who might be able to break the cycle and save her family from the grisly demise that inevitably awaits them all.',
    'https://image.tmdb.org/t/p/w500/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg',
    'movie'
  ),
  (
    552524,
    'Lilo & Stitch',
    'The wildly funny and touching story of a lonely Hawaiian girl and the fugitive alien who helps to mend her broken family.',
    'https://image.tmdb.org/t/p/w500/7c5VBuCbjZOk7lSfj9sMpmDIaKX.jpg',
    'movie'
  ),
  (
    1311844,
    'The Twisters',
    'A deadly patchwork of destructive cyclones is on an apocalyptic path of convergence at a populated Midwest city center. There, the twisters will merge into one mega tornado that threatens to obliterate the cities for hundreds of miles around.',
    'https://image.tmdb.org/t/p/w500/8OP3h80BzIDgmMNANVaYlQ6H4Oc.jpg',
    'movie'
  ),
  (
    1087192,
    'How to Train Your Dragon',
    'On the rugged isle of Berk, where Vikings and dragons have been bitter enemies for generations, Hiccup stands apart, defying centuries of tradition when he befriends Toothless, a feared Night Fury dragon. Their unlikely bond reveals the true nature of dragons, challenging the very foundations of Viking society.',
    'https://image.tmdb.org/t/p/w500/q5pXRYTycaeW6dEgsCrd4mYPmxM.jpg',
    'movie'
  );
  
  COMMIT;