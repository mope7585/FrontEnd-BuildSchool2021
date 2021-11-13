export default {
    props: {
        name: {
            // < !--傳入形式 -- >
            type: string,
            // < !--如果沒有傳值，預設是什麼-- >
            default: 'BuildSchool',
            required: false
        }
    },
    data: () => ({}),
    // < !--建造一個Template -->
    template: '<h1>hello world {{name}}</h1>'
}