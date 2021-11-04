const handleOpen = useCallback(() => {
    hideModal(true);
    close();
}, [hideModal]);