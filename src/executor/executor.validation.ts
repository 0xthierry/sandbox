/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

export const create = Yup.object().shape({
  source: Yup.string()
    .oneOf(['git'], 'Source not supported')
    .required('Source not supported'),
  origin: Yup.string().required('You must provide an origin'),
  startCommand: Yup.string().required('You must provide a command'),
  image: Yup.string()
    .oneOf(['node:12', 'node:10'], 'Image not supported')
    .required('Image not supported'),
});
