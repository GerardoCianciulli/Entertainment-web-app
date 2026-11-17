import { useEffect, type RefObject } from 'react';
import { useFormikContext } from 'formik';
import $ from 'jquery';

/**
 * jQuery interaction: after a submit attempt fails (empty / invalid fields, or
 * a server-side error such as a wrong password) move focus to the first
 * invalid input so the user lands right on the problem.
 */
export function FocusFirstError({ formRef }: { formRef: RefObject<HTMLFormElement | null> }) {
  const { submitCount, isSubmitting, isValid } = useFormikContext();

  useEffect(() => {
    if (submitCount === 0 || isSubmitting || isValid || !formRef.current) return;
    $(formRef.current).find('[aria-invalid="true"]').first().trigger('focus');
    // Deliberately keyed on submit attempts only, not on every keystroke.
  }, [submitCount, isSubmitting]);

  return null;
}
