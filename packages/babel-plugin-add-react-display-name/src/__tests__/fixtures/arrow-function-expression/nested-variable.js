// nested in child scope as a variable
/* eslint-disable */
const factory = () => {
    const Foo = () => {
        return <div />;
    };

    return Foo;
};
