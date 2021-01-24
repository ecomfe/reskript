// nested in child scope as a variable
/* eslint-disable */
const factory = () => {
    const Foo = function () {
        return <div />;
    };

    return Foo;
};
