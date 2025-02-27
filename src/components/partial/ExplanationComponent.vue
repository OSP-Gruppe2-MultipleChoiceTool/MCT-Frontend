<template>
    <div id="information" class="my-20 bg-white" :class="borderColor">
            <p class="p-20">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores sit facilis voluptates ducimus,
                aperiam exercitationem doloribus rem ullam adipisci mollitia cum maiores a debitis nesciunt, quod autem
                explicabo inventore sint.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores sit facilis voluptates ducimus,
                aperiam exercitationem doloribus rem ullam adipisci mollitia cum maiores a debitis nesciunt, quod autem
            </p>
        </div>
</template>

<script setup lang="ts">
const props = defineProps({
    borderColor: {
        type: String,
        required: false,
    }
});

</script>