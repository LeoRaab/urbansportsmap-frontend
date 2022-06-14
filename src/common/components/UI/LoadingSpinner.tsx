import Portal from './Portal';

const LoadingSpinner = () => {
    return (
        <Portal>
            <div className="absolute top-1/2 w-screen z-1100 flex justify-center items-center">
                <div className="bg-white p-4 rounded-full">
                    <div
                        className="spinner-border w-16 h-16 border-4 border-indigo-400 border-solid rounded-full animate-spin" />
                </div>
            </div>
        </Portal>
    )
}

export default LoadingSpinner;

