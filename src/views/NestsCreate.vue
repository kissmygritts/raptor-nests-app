<template>
  <div class="container mx-auto mt-16">
    <form class="w-5/6 mx-auto">
      <h1 class="text-2xl text-gray-700">Create a New Nest</h1>
      <p class="text-gray-700">
        Complete the form below to enter a new nest.
      </p>

      <label for="nest_id" class="block mt-3">
        <span class="text-gray-700">Nest ID</span>
        <input type="text" class="w-full form-input mt-1 block" v-model="nest.nestid">
      </label>

      <label for="lat" class="block mt-3">
        <span class="text-gray-700">Latitude</span>
        <input type="text" class="w-full form-input mt-1 block" v-model="nest.lat">
      </label>

      <label for="long" class="block mt-3">
        <span class="text-gray-700">Longitude</span>
        <input type="text" class="w-full form-input mt-1 block" v-model="nest.long">
      </label>

      <label for="location" class="block mt-3">
        <span class="text-gray-700">Location</span>
        <input type="text" class="w-full form-input mt-1 block" v-model="nest.location">
        <p class="text-sm font-light mt-1">
          General description of the survey area location and relevant landmarks
          (e.g. mountain range, rivers, landscape features).
        </p>
      </label>

      <label for="Habitat Category" class="block mt-3">
        <span class="text-gray-700">Habitat Category</span>
        <select name="habitat_category" class="w-full form-select mt-1 block" v-model="nest.habitat_category">
          <option value="">Select One</option>
          <option>Riparian - aspen</option>
          <option>Riparian - other</option>
          <option>Shoreline</option>
          <option>Canyon</option>
          <option>Dessert wash</option>
          <option>Salt desert scrub</option>
          <option>Creosote scrub</option>
          <option>Sagebrush</option>
          <option>Pinyon juniper</option>
          <option>Joshua tree</option>
          <option>Mixed conifer</option>
          <option>Grassland</option>
          <option>Agriculture</option>
          <option>Developed - other</option>
          <option>Other</option>
        </select>
        <p class="text-sm font-light mt-1">
          Select the option that best describes the habitat type for the nesting ares.
        </p>
      </label>

      <label for="Habitat Description" class="block mt-3">
        <span class="text-gray-700">Habitat Description</span>
        <input type="text" class="w-full form-input mt-1 block" v-model="nest.habitat_description">
        <p class="text-sm font-light mt-1">
          General description of the habitat characteristics of the nest site location.
        </p>
      </label>

      <label for="Nest Substrate" class="block mt-3">
        <span class="text-gray-700">Nest Substrate</span>
        <select name="nest_substrate" class="w-full form-select mt-1 block" v-model="nest.nest_substrate">
          <option value="">Select one</option>
          <option>Artificial</option>
          <option>Tree</option>
          <option >Shrub</option>
          <option>Ground - surface</option>
          <option>Ground - subterranean</option>
          <option>Outcrop</option>
          <option>Cliff</option>
        </select>
        <p class="text-sm font-light mt-1">
          The substrate upon which the nest is located. More specific details
          should be provided in the nest comments field.
        </p>
      </label>

      <label for="Nest Type" class="block mt-3">
        <span class="text-gray-700">Nest Type</span>
        <select name="nest_type" class="w-full form-select mt-1 block" v-model="nest.nest_type">
          <option value="">Select one</option>
          <option>Burrow</option>
          <option>Cavity</option>
          <option>Scrape</option>
          <option>Stick nest</option>
        </select>
      </label>

      <label for="probable_origin" class="block mt-3">
        <span class="text-gray-700">Probable Origin</span>
        <select name="probable_origin" class="w-full form-select mt-1 block" v-model="nest.probable_origin">
          <option value="">Select one</option>
          <option>Accipter</option>
          <option>Buteo</option>
          <option>Accipiter/Buteo</option>
          <option>Buteo/Corvid</option>
          <option>Eagle</option>
          <option>Eagle/Buteo</option>
          <option>Corvid</option>
          <option>Falcon</option>
          <option>Northern Goshawk</option>
          <option>Ferruginous Hawk</option>
          <option>Burrowing Owl</option>
          <option>Osprey</option>
          <option>Other</option>
        </select>
        <p class="text-sm font-light mt-1">
          Select the species you believe initially constructed the nest.
        </p>
      </label>

      <label for="nest_comments" class="block mt-3">
        <span class="text-gray-700">Nest Comments</span>
        <textarea class="w-full form-textarea mt-1 block w-full" rows="3" v-model="nest.nest_comments"></textarea>
        <p class="text-sm font-light mt-1">
          Description of the unchanging characteristics of the nest itself. Including,
          but not limited to tree or shrub species, height above ground, etc.
        </p>
      </label>

      <!-- form buttons -->
      <div class="my-8 w-full flex justify-end">
        <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit Nest</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nest: {
        nestid: '',
        lat: '',
        long: '',
        location: '',
        habitat_category: '',
        habitat_description: '',
        nest_substrate: '',
        nest_type: '',
        probable_origin: '',
        nest_comments: ''
      }
    }
  }
}
</script>

<style>

</style>
