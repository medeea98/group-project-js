async function e(e){const t=`https://api.themoviedb.org/3/${e}?api_key=004a3a7ad0ebfa9ee53f6d0ac407af43`;try{const e=await fetch(t);return await e.json()}catch(e){console.error(`Error at ${t}`,e)}}window.onload=async function(){const t=document.createElement("div");t.classList.add("movies");const n=document.createElement("div");n.id="movie-container",t.appendChild(n),document.body.appendChild(t);const a=await async function(){return e("trending/movie/week")}(),i=await async function(){return e("genre/movie/list")}();a.results.forEach((e=>{const t=document.createElement("div");t.classList.add("movie-card");const a=document.createElement("img");a.src=`https://image.tmdb.org/t/p/w500/${e.poster_path}`,a.alt=`${e.title} Poster`,a.classList.add("movie-image");const s=document.createElement("div");s.classList.add("movie-description");const d=document.createElement("h2");d.textContent=e.title,d.classList.add("movie-title");const o=e.genre_ids.map((e=>{const t=i.genres.find((t=>t.id===e));return t?t.name:""})),c=o.slice(0,2),r=o.slice(2),l=(m=e.vote_average,Math.abs(m%1)>=.005?Math.ceil(100*m)/100:Math.floor(100*m)/100);var m;const p=document.createElement("p"),h=document.createElement("span");h.classList.add("rating"),h.textContent=` ${l}`,r.length>0?p.innerHTML=`${c.join(", ")}, Other | ${e.release_date?e.release_date.substring(0,4):"N/A"} | `:p.innerHTML=`${c.join(", ")} | ${e.release_date?e.release_date.substring(0,4):"N/A"} | `,p.appendChild(h),p.classList.add("movie-details"),s.appendChild(d),s.appendChild(p),t.appendChild(a),t.appendChild(s),n.appendChild(t)}))};
//# sourceMappingURL=index.60c2acff.js.map
