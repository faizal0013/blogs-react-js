const InputFile = ({ onChangeImageFile }) => {
  return (
    <input
      type={'file'}
      id="file"
      className="text-sm text-grey-500
        file:mr-5 file:py-3 file:px-10
        file:rounded-full file:border-0
        file:text-md file:font-semibold  file:text-white
        file:bg-gradient-to-r file:from-blue-600 file:to-amber-600
        hover:file:cursor-pointer hover:file:opacity-80"
      onChange={onChangeImageFile}
    />
  );
};

export default InputFile;
