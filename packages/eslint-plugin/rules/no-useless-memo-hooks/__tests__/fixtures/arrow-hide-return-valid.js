// the same as function expression
const handleOpen = useCallback(() => {
    hideModal();
}, [hideModal]);