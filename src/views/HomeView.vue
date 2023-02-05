<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        @input="getSearchResults"
        v-model="searchQuery"
        type="text"
        placeholder="Search for city or State"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus: shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        v-if="mapBoxResult"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top[66px]"
      >
        <p class="py-2" v-if="searchErrors">
          Sorry Something went wrong, please try again.
        </p>
        <p class="py-2" v-if="!searchErrors && mapBoxResult === 0">
          No match for your query, try something different
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapBoxResult"
            :key="searchResult.id"
            @click="previewCity(searchResult)"
            class="py-2 cursor-pointer"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import CityCardSkeleton from "../components/CityCardSkeleton.vue";
const router = useRouter();
const previewCity = (searchResult) => {
  //console.log(searchResult);
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};
const mapBoxResult = ref(null);
const mapboxKey =
  "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";
const searchQuery = ref("");
const queryTimeout = ref(null);
const searchErrors = ref(null);
const getSearchResults = () => {
  setTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxKey}&types=place`
        );
        mapBoxResult.value = result.data.features;
      } catch {
        searchErrors.value = true;
      }
      return;
    } else {
      mapBoxResult = null;
    }
  }, 300);
};
</script>
