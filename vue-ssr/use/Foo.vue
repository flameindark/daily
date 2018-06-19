<template>
    <h2>Hello server-render</h2>
</template>

<script>
export default {
    created() {
        console.log('created');
    },
    mounted() {
        console.log('mounted');
    },
    beforeCreated() {
        console.log('beforeCreated');
    },
}
</script>

<style>

</style>
